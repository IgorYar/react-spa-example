import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: [],
    loading: false,
    error: null
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        fetchCommentsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCommentsSuccess: (state, action) => {
            state.loading = false;
            state.comments = action.payload;
        },
        fetchCommentsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure } = commentsSlice.actions;
export default commentsSlice.reducer;