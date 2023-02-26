import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import carBrandApi from "../../api/carBrandApi";
import { carBrand } from "../../models";
import { ListParams, ListRespone } from "../../models/common";
import { carBrandActions } from "./carBrandSlice";

function* fetchCarBrandList(action: PayloadAction<ListParams>){
    console.log("Handle fetchCarBrandList");
    try {
        const response: ListRespone<carBrand> = yield call(carBrandApi.getAll, action.payload);
        yield put(carBrandActions.fetchCarBrandListSuccess(response));
    } catch (error) {
        console.log("Failed to fetch student list!", error);
        yield put(carBrandActions.fetchCarBrandListFailed());
    }
}

export default function* carBrandSaga(){
    // watch fetch carbrand action
    yield takeLatest(carBrandActions.fetchCarBrandList, fetchCarBrandList);
}