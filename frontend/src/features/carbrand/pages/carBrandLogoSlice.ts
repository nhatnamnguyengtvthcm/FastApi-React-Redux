import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";



// export interface ImagePaload {
//     brandcarId: number;
//     file?: File;
// }
export interface carBrandLogoState {
    brandcarId: number;
    file: File;
}
export interface logoFile {
    file: File;
}
const initialState: carBrandLogoState = {
    file: undefined!,
    brandcarId: -1,
}
const carBrandLogoSlice = createSlice({
    name: "carBrandLogo",
    initialState,
    reducers:{
        upLoadLogo(state, action:PayloadAction<carBrandLogoState>){
            state.brandcarId =  action.payload.brandcarId;
            state.file = action.payload.file;
        },
        getBrandId(state,action){
            state.brandcarId = action.payload.brandcarId;
        },
        putFile(state,action:PayloadAction<logoFile>){
            state.file = action.payload.file;
        }
        
    }


})

//Action
export const  carBrandLogoActions = carBrandLogoSlice.actions

//reducer
const carBrandActionsReducer = carBrandLogoSlice.reducer;
export default carBrandActionsReducer;


// selector
export const selectLogoFile = (state:RootState)=> state.carbrandLogo.file
