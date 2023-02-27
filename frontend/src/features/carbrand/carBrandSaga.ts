import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
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

function* handleSearchDebouce(action: PayloadAction<ListParams>){
    console.log("Handle handleSearchDebouce: ",action.payload.brand_name);
    yield put(carBrandActions.setFilter(action.payload));
    
}
export default function* carBrandSaga(){
    // watch fetch carbrand action
    yield takeLatest(carBrandActions.fetchCarBrandList, fetchCarBrandList);
    yield debounce(500, carBrandActions.setFilterWithDebouce, handleSearchDebouce)
}