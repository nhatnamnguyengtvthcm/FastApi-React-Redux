import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { carBrand } from "../../models";
import { ListParams, ListRespone, PaginationParams } from "../../models/common";

export interface carBrandState {
    loading: boolean;
    carBrandList?: carBrand[] ;
    filter: ListParams;
    pagination?: PaginationParams
}
const initialState: carBrandState = {
    loading: false,
    carBrandList:[],
    filter:{
        _skip: 0,
        _limit: 10
    },
    // pagination: {
    //     _page: 1,
    //     _limit: 10,
    //     _totalRow: 10
    // }
}
const carBrandSlice = createSlice({
    name: "carbrand",
    initialState,
    reducers:{
        fetchCarBrandList(state, action:PayloadAction<ListParams>){
            state.loading =  true;

        },
        fetchCarBrandListSuccess(state, action:PayloadAction<ListRespone<carBrand>>){
            state.loading =  false;
            state.carBrandList = action.payload.data;
        },
        fetchCarBrandListFailed(state, action){
            state.loading =  false;
        },
        setFilter(state, action:PayloadAction<ListParams>){
            state.filter = action.payload
        }
    }

})

//Action
export const  carBrandActions = carBrandSlice.actions

//reducer
const carBrandReducer = carBrandSlice.reducer;
export default carBrandReducer;


// selector
export const selectCarBrandList = (state:RootState)=> state.carbrand.carBrandList
export const selectCarBrandLoading = (state:RootState)=> state.carbrand.loading
export const selectCarBrandFilter = (state:RootState)=> state.carbrand.filter
export const selectCarBrandPagination = (state:RootState)=> state.carbrand.pagination
