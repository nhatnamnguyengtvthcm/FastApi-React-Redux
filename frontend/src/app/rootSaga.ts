import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import carBrandLogoSaga from '../features/carbrand/carBrandLogoSaga';
import carBrandSaga from '../features/carbrand/carBrandSaga';
import counterSaga from '../features/counter/counterSaga';
// function* helloSaga(){
//     console.log("Hello Saga");

// }
export default function* rootSaga(){
    console.log("root saga");
    // yield all([helloSaga(), counterSaga()]);
    yield all([counterSaga(), authSaga(), carBrandSaga(),carBrandLogoSaga()]);
}