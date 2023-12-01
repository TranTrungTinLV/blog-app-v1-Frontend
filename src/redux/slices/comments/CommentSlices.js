import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseURL';

//Redirect
const resetCommentAction = createAction("comment/reset");
//create
export const createCommentsAction = createAsyncThunk('comment/create', async (comment, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`
        }
    }
    //http callback
    try {
        const { data } = await axios.post(`${baseUrl}/api/comments`, {
            description: comment?.description,
            postId: comment?.postId
        }, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

//delete
export const deleteCommentsAction = createAsyncThunk('comment/delete', async (commentId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`
        }
    }
    //http callback
    try {
        const { data } = await axios.delete(`${baseUrl}/api/comments/${commentId}`, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

//update
export const updateCommentsAction = createAsyncThunk('comment/update', async (comment, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`
        }
    }
    //http callback
    try {
        const { data } = await axios.put(`${baseUrl}/api/comments/${comment?.id}`, { description: comment?.description }, config);
        dispatch(resetCommentAction())
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

//fetch comment details
export const fetchCommentsAction = createAsyncThunk('comment/fetch-details', async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`
        }
    }
    //http callback
    try {
        const { data } = await axios.get(`${baseUrl}/api/comments/${id}`, config);
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});
//slices
const commentSlices = createSlice(
    {
        name: "comment",
        initialState: {},
        extraReducers: builder => {
            //create
            builder.addCase(createCommentsAction.pending, (state, action) => {
                state.loading = true;
            })
            builder.addCase(createCommentsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.commentCreated = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            builder.addCase(createCommentsAction.rejected, (state, action) => {
                state.loading = false;
                state.commentCreated = undefined;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })

            //delete
            builder.addCase(deleteCommentsAction.pending, (state, action) => {
                state.loading = true;
            })
            builder.addCase(deleteCommentsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.commentDeleted = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            builder.addCase(deleteCommentsAction.rejected, (state, action) => {
                state.loading = false;
                state.commentCreated = undefined;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })

            //update
            builder.addCase(updateCommentsAction.pending, (state, action) => {
                state.loading = true;
            })
            builder.addCase(resetCommentAction,(state,action)=>{
                state.isUpdated = true;
            })
            builder.addCase(updateCommentsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.commentUpdated = action?.payload;
                state.isUpdated = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            builder.addCase(updateCommentsAction.rejected, (state, action) => {
                state.loading = false;
                state.commentCreated = undefined;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })

            //fetch comment details
            builder.addCase(fetchCommentsAction.pending, (state, action) => {
                state.loading = true;
            })
            builder.addCase(fetchCommentsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.commentDetails = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            builder.addCase(fetchCommentsAction.rejected, (state, action) => {
                state.loading = false;
                state.commentCreated = undefined;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })
        }
    }
)

export default commentSlices.reducer;