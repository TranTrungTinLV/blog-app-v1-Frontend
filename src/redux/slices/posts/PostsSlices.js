import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseURL';

//Create Post action
const resetPostAction = createAction("category/reset");

export const createPostAction = createAsyncThunk('post/created',
    async (post, { rejectWithValue, getState, dispatch }) => {
        console.log(post);
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
        const formData = new FormData();
        formData.append('title',post?.title);
        formData.append('description',post?.description);
        formData.append('category',post?.category);
        formData.append('image',post?.image);
        const { data } = await axios.post(`${baseUrl}/api/posts`, formData, config);
        //dispacth action
        dispatch(resetPostAction())
        return data
    } catch (error) {
        if (!error?.response) {
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

//fetch all post action
export const fetchPostAction = createAsyncThunk(
    "post/list",
    async (category, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/posts?category=${category}`
        );
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//Add Like to post

export const toggleAddLikeToPost = createAsyncThunk('post/like',async (postId,{rejectWithValue,getState, dispatch}) => {
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
        const {data} = await axios.put(`${baseUrl}/api/likes`,postId,config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data)
    }
})

//slice
const postSlice = createSlice({
    name: "post",
    initialState: {},

    extraReducers: builder => {
        //create post
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostAction,(state,action) => {
            state.isCreated = true;
        })
        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.postCreated = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })

         //fetch all post
         builder.addCase(fetchPostAction.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(fetchPostAction.fulfilled, (state, action) => {
            state.postLists = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(fetchPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });

          //Likes
          builder.addCase(toggleAddLikeToPost.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(toggleAddLikeToPost.fulfilled, (state, action) => {
            state.likes = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(toggleAddLikeToPost.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });
    }
})

export default postSlice.reducer