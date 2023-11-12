import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slices/users/usersSlices';
import categoriesReducer from '../slices/category/categorySlices'
import post from '../../redux/slices/posts/PostsSlices'
const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoriesReducer,
        post,
    }
})

export default store