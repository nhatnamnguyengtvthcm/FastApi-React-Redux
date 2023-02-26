import { PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import carBrandApi from "../../api/carBrandApi";
import { carBrand } from "../../models";
import { ListParams, ListRespone } from "../../models/common";
import { carBrandActions } from "./carBrandSlice";
import { carBrandLogoActions, carBrandLogoState } from "./pages/carBrand\bLogoSlice";


// function* fetchCarBrandList(action: PayloadAction<ListParams>){
//     console.log("Handle fetchCarBrandList");
//     try {
//         const response: ListRespone<carBrand> = yield call(carBrandApi.getAll, action.payload);
//         yield put(.fetchCarBrandListSuccess(response));
//     } catch (error) {
//         console.log("Failed to fetch student list!", error);
//         yield put(.fetchCarBrandListFailed());
//     }
// }

function* uploadCarBrandLogo(action:PayloadAction<carBrandLogoState>){
    console.log("Handle upload file");
    try {
        yield call(carBrandApi.uploadLogo,action.payload.brandcarId, action.payload.file);
        
    } catch (error) {
        console.log("Upload fail!", error);
    }
}

export default function* carBrandLogoSaga(){
    // watch fetch carbrand action
    yield takeEvery(carBrandLogoActions.upLoadLogo, uploadCarBrandLogo);
}