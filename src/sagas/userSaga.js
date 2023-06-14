import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../slices/userSlice.js';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* fetchUserSaga(action) {
    try {
        const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${action.payload}`);
        yield delay(1000);
        yield put(fetchUserSuccess(response.data));
    } catch (error) {
        yield put(fetchUserFailure(error.message));
    }
}

export function* watchFetchUser() {
    yield takeLatest(fetchUserRequest.type, fetchUserSaga);
}