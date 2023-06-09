import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../slices';

import { watchFetchPosts } from '../sagas/postSaga';
import { watchFetchUser } from '../sagas/userSaga';
import { watchFetchComments } from '../sagas/commentSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(watchFetchPosts);
sagaMiddleware.run(watchFetchUser);
sagaMiddleware.run(watchFetchComments);

export default store;