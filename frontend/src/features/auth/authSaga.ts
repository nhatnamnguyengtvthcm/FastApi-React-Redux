import { FunctionsOutlined } from "@mui/icons-material";
import { PayloadAction } from "@reduxjs/toolkit";
import { ErrorInfo } from "react";
import { useNavigate } from "react-router-dom";
import { call, fork, put, take } from "redux-saga/effects";
import { ErrorCallback } from "typescript";
import { authActions, loginPayload } from "./authSlice";

function* handleLogin(payload:loginPayload){
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        console.log("Handle Login", payload);
        localStorage.setItem('access_token', '');
        yield put(authActions.loginSuccess({id:1, name:"Admin"}))
    } catch (error) {
        let errorMessage = "Login Failed";
        yield put(authActions.loginFailed(errorMessage))
    }
   
}   

function* handleLogout(){
    console.log("Handle Logout");
    localStorage.removeItem('access_token');
    yield put(authActions.logout());
    // redirect to loginPage
} 
function* watchLoginFlow(){
    while(true){
        const isLoginedIn:boolean = Boolean(localStorage.getItem('access_token'))
        if(!isLoginedIn){
            const action: PayloadAction<loginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }
        
        yield take(authActions.logout.type);
        // chỗ này dùng call để nó chờ xử lý xong handleLogout rồi mới check điều kiên isLoginedIn
        // yield fork(handleLogout);
        yield call(handleLogout);
    }
 
}
export default function* authSaga() {
    yield fork(watchLoginFlow);
    console.log("authSaga")
}