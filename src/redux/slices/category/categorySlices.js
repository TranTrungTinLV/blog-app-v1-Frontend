import {createAsyncThunk, createSlice,createAction} from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseURL';

//action to natigative 
const resetEditAction = createAction("category/reset");
const resetDeleteAction = createAction("category/delete-reset");
const resetCategoryAction = createAction("category/created-reset");

//action
export const createCategoryAction = createAsyncThunk('category/create',async(category,{rejectWithValue,getState,dispatch})=>{
    //get user token
    const user = getState()?.users;
    const {userAuth} = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}` 
        }
    }
    //http callback
    try {
        const {data} = await axios.post(`${baseUrl}/api/category`,{
            title: category?.title,
        },config);
        //dispatch action
        dispatch(resetCategoryAction())
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

//fetch all action
export const fetchCategoriesAction = createAsyncThunk(
    "category/fetch",
    async (category, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      try {
        const { data } = await axios.get(`${baseUrl}/api/category`, config);
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  

//Update action
export const updateCategoriesAction = createAsyncThunk('category/update',async(category,{rejectWithValue,getState,dispatch})=>{
    //get user token
    const user = getState()?.users;
    const {userAuth} = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}` 
        }
    }
    //http callback
    try {
        const {data} = await axios.put(`${baseUrl}/api/category/${category?.id}`,
        {title: category?.title},
        config);
        //dispatch action to reset the update data
        dispatch(resetEditAction())
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

//Delete action
export const deleteCategoriesAction = createAsyncThunk('category/delete',async(id,{rejectWithValue,getState,dispatch})=>{
    //get user token
    const user = getState()?.users;
    const {userAuth} = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}` 
        }
    }
    //http callback
    try {
        const {data} = await axios.delete(`${baseUrl}/api/category/${id}`,config);
        //dispatch action
        dispatch(resetDeleteAction())
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

//fetch details
export const fetchDetailCategoriesAction = createAsyncThunk('category/details',async(id,{rejectWithValue,getState,dispatch})=>{
    //get user token
    const user = getState()?.users;
    const {userAuth} = user;
    // console.log(userAuth?.token)
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}` 
        }
    }
    //http callback
    try {
        const {data} = await axios.get(`${baseUrl}/api/category/${id}`,config);
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});
//slices
const categorySlices = createSlice({
    name: "category",
    initialState:{},
    extraReducers:(builder)=>{
        //create
        builder.addCase(createCategoryAction.pending,(state,action)=>{
            state.loading = true
        });
        //dispatch action to nativgave
        builder.addCase(resetCategoryAction,(state,action)=>{
             state.isCreated = true;
        })
        builder.addCase(createCategoryAction.fulfilled,(state,action)=>{
            state.category = action?.payload;
            state.loading = false;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
         
        //fetch all
        builder.addCase(fetchCategoriesAction.pending, (state, action) => {
            state.loading = true;
          });
          builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
            state.categoryList = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });

        //Update
        builder.addCase(updateCategoriesAction.pending,(state,action)=>{
            state.loading = true;
        });
        //Dispatch action
        builder.addCase(resetEditAction,(state,action)=>{
            state.isEdited = true;
        })
        builder.addCase(updateCategoriesAction.fulfilled,(state,action)=>{
            state.updateCategory = action?.payload;
            state.loading = false;
            state.isEdited = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updateCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })

        //delete
        builder.addCase(deleteCategoriesAction.pending,(state,action)=>{
            state.loading = true;
        });
        //dispatch for native
        builder.addCase(resetDeleteAction,(state,action)=>{
            state.isDeleted = true;
        })
        builder.addCase(deleteCategoriesAction.fulfilled,(state,action)=>{
            state.deleteCategory = action?.payload;
            state.loading = false;
            state.isDeleted = false; 
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })

        //fetch details
        builder.addCase(fetchDetailCategoriesAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(fetchDetailCategoriesAction.fulfilled,(state,action)=>{
            state.category = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchDetailCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        })
    }
})

export default categorySlices.reducer;