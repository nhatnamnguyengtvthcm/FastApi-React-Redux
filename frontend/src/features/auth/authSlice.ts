import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface loginPayload {
    username: string | null;
    password: string | null;

}
export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser: User


}
const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: {},
  

}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action:PayloadAction<loginPayload>){
            state.logging = true;
            
        },
        loginSuccess(state, action:PayloadAction<User>){
            state.logging = false;
            state.currentUser = action.payload;
            state.isLoggedIn = true;
            
        },
        loginFailed(state, action:PayloadAction<String>){
            state.logging = false;
        },

        logout(state){
            state.currentUser = {};
            state.isLoggedIn = false;
        }
        

    }
})


//Actions
export const authActions = authSlice.actions;
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.isLoggedIn;
//Selectors

//Reducer

const authReducer = authSlice.reducer;
export default  authReducer;
