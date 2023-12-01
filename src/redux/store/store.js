import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slices/users/usersSlices';
import categoriesReducer from '../slices/category/categorySlices'
import post from '../../redux/slices/posts/PostsSlices'
import comment from '../../redux/slices/comments/CommentSlices'
import sendMail from "../../redux/slices/email/emailSlices";
import accountVerication from "../slices/AccountVercation/accountVercationSlices"
const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoriesReducer,
        post,
        comment,
        sendMail,
        accountVerication
    }
})

export default store