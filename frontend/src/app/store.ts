import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   thunk: true,
    //   serializableCheck: false,
    //   immutableCheck: false
    // }),
    getDefaultMiddleware().concat(sagaMiddleWare),
});
sagaMiddleWare.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
