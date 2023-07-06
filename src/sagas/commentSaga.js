import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure } from '../slices/commentsSlice.js';

function* fetchCommentsSaga(action) {
    try {
        const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/comments?postId=${action.payload}`);
        yield put(fetchCommentsSuccess(response.data));
    } catch (error) {
        yield put(fetchCommentsFailure(error.message));
    }
}

export function* watchFetchComments() {
    yield takeLatest(fetchCommentsRequest.type, fetchCommentsSaga);
}