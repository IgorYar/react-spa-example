import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

const rootReducer = combineReducers({
    posts: postsReducer,
    user: null
});

export default rootReducer;