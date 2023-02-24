import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import carBrandApi from "../../api/carBrandApi";
import { ListParams } from "../../models/common";
import { carBrandActions } from "./carBrandSlice";

function* fetchCarBrandList(action: PayloadAction<ListParams>){
    try {
        yield call(carBrandApi.getAll, action.payload);
    } catch (error) {
        console.log("Failed to fetch student list!", error);
    }
}

export default function* carBrandSaga(){
    // watch fetch carbrand action
    yield takeLatest(carBrandActions.fetchCarBrandList, fetchCarBrandList);
}