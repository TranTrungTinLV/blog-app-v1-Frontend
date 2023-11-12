import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseURL';

//Create Post action

export const createPostAction = createAsyncThunk('post/created',
     async (post, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`
        }
    };
    try {
        //http call
        const { data } = await axios.post(`${baseUrl}/api/posts`, post, config);
        return data
    } catch (error) {
        if (!error?.response) {
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

//slice
const postSlice = createSlice({
    name: "post",
    initialState: {},

    extraReducers: builder => {
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.postCreated = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})

export default postSlice.reducer