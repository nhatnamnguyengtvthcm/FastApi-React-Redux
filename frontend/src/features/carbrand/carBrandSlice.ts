import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { carBrand } from "../../models";
import { ListParams, ListRespone, PaginationParams } from "../../models/common";

// export interface ImagePaload {
//     brandcarId: number;
//     file: File;
// }
export interface carBrandState {
    loading: boolean;
    carBrandList: carBrand[] ;
    filter: ListParams;
    pagination: PaginationParams
}
const initialState: carBrandState = {
    loading: false,
    carBrandList:[],
    filter:{
        offset: 0,
        limit: 10,
        page:0
    },
    pagination: {
        offset: 0,
        limit: 10,
        total: 0,
        page:0
    }
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
            state.carBrandList = action.payload.items;
            const pagination:PaginationParams = {
                total: action.payload.total,
                limit: action.payload.limit,
                offset: action.payload.offset,
                
            }
            state = {...state, pagination};
        },
        fetchCarBrandListFailed(state){
            state.loading =  false;
        },
        setFilter(state, action:PayloadAction<ListParams>){
            state.filter = action.payload;
        },
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
