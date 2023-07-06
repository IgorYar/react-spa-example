import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import userReducer from './userSlice';
import commentsReducer from './commentsSlice'

const rootReducer = combineReducers({
    posts: postsReducer,
    user: userReducer,
    comments: commentsReducer
});

export default rootReducer;