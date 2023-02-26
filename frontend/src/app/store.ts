import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import authReducer from '../features/auth/authSlice';
import carBrandReducer from '../features/carbrand/carBrandSlice';
import carBrandActionsReducer from '../features/carbrand/pages/carBrand\bLogoSlice';

const sagaMiddleWare = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    carbrand: carBrandReducer,
    carbrandLogo: carBrandActionsReducer
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   thunk: true,
    //   serializableCheck: false,
    //   immutableCheck: false
    // }),
    getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleWare),
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
