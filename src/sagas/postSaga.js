import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from '../slices/postsSlice.js';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* fetchPostsSaga() {
    try {
        const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts');
        yield delay(1000);
        yield put(fetchPostsSuccess(response.data));
    } catch (error) {
        yield put(fetchPostsFailure(error.message));
    }
}

export function* watchFetchPosts() {
    yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
}