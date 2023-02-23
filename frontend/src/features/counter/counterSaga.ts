import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";

// export function* log(action: PayloadAction){
//     console.log("Log", increment().type);
// }

function* handleIncrementSaga(action: PayloadAction<number>){
    console.log('handle Increment Saga');
    // waiting 2s
    yield delay(2000);
    console.log('wating done, dispatch action');
    yield put(incrementSagaSuccess(action.payload))
}



export default function* counterSaga(){
    console.log("counter saga");
    // yield takeEvery('*', log);
    // yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
    yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}