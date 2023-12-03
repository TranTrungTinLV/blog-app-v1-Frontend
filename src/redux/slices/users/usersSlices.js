import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

import axios from "axios";

import baseUrl  from "../../../utils/baseURL";
//redirect action
const resetUserAction = createAction('/user/profile/reset')
const resetPasswordAction = createAction('password/reset')

//register action
export const registerUserAction = createAsyncThunk('users/register', async (user, { rejectWithValue, getState, dispatch }) => {
    try {
        //http call
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(`${baseUrl}/api/users/register`, user, config);
        return data
    } catch (error) {
        if (!error?.response) {
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
});
//Login
export const loginUserAction = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            //make http call
            const { data } = await axios.post(`${baseUrl}/api/users/login`, userData, config);
            //save user into local storage
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error
            }
            return rejectWithValue(error?.response?.data)
        }
    }
);

//Profile
export const userProfileAction = createAsyncThunk('user/profile', async (id, { rejectWithValue, getState, dispatch }) => {
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
        const { data } = await axios.get(`${baseUrl}/api/users/profile/${id}`, config);

        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        };
        return rejectWithValue(error?.response?.data)
    }
});

// Follow
export const followUserAction = createAsyncThunk(
    "user/follow",
    async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.put(
                `${baseUrl}/api/users/follow`,
                { followId: userToFollowId },
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//unFollow
export const unfollowUserAction = createAsyncThunk(
    "user/unfollow",
    async (unFollowId, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.put(
                `${baseUrl}/api/users/unfollow`,
                { unFollowId },
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//update password

export const updateUserAction = createAsyncThunk('users/update', async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
        //http call
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        // console.log(userAuth?.token)
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        const { data } = await axios.put(`${baseUrl}/api/users`, {
            "firstName": userData?.firstName,
            "lastName": userData?.lastName,
            "bio": userData?.bio,
            "email": userData?.email
        }, config);
        //dispatch
        dispatch(resetUserAction());
        return data
    } catch (error) {
        console.log("loi")
        if (!error?.response) {
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
});

//update action
export const updatePassWordAction = createAsyncThunk(
    "password/update",
    async (password, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.put(
                `${baseUrl}/api/users/password`,
                {
                    password,
                },
                config
            );
            //dispatch
            dispatch(resetPasswordAction());
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    });

//Logout action
export const logoutAction = createAsyncThunk(
    '/user/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo')
        } catch (error) {
            if (!error?.response) {
                throw error
            }
            return rejectWithValue(error?.response?.data)

        }
    }
)

//fetch User details
export const fetchUserDetailsAction = createAsyncThunk(
    "user/detail",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/users/${id}`);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch User all
export const fetchUsersAction = createAsyncThunk(
    "user/list",
    async (id, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        // console.log(userAuth?.token)
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.get(`${baseUrl}/api/users`, config);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Block user
export const blockUsersAction = createAsyncThunk(
    "user/block",
    async (id, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        // console.log(userAuth?.token)
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/block-user/${id}`, {}, config);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//unBlock user
export const unBlockUsersAction = createAsyncThunk(
    "user/unblock",
    async (id, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        // console.log(userAuth?.token)
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.put(`${baseUrl}/api/users/unblock-user/${id}`, {}, config);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Upload profile photo
export const uploadProfilePhotoAction = createAsyncThunk('user/profile-photo',
    async (userImg, { rejectWithValue, getState, dispatch }) => {
        // console.log(post);
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
            formData.append('image', userImg?.image);
            const { data } = await axios.put(`${baseUrl}/api/users/profile-upload-photo`, formData, config);

            return data
        } catch (error) {
            if (!error?.response) {
                throw error;
            };
            return rejectWithValue(error?.response?.data)
        }
    });

//password reset token generation
export const passwordResetTokenAction = createAsyncThunk('password/token', async (email, { rejectWithValue, getState, dispatch }) => {
    try {
        //http call
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(`${baseUrl}/api/users/forget-password-token`, { email }, config);
        return data
    } catch (error) {
        if (!error?.response) {
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
});

//Password reset
export const passwordResetAction = createAsyncThunk(
    "password/reset",
    async (user, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        //http call
        try {
            const { data } = await axios.put(
                `${baseUrl}/api/users/reset-password`,
                { password: user?.password, token: user?.token },
                config
            );
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

//slices
const usersSlices = createSlice({
    name: 'users',
    initialState: {
        // userAuth:'login',
        userAuth: userLoginFromStorage
    },
    extraReducers: (builder) => {
        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            // console.log(action.payload)
            state.loading = false;
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message;
        })

        //Password reset token generation
        builder.addCase(passwordResetTokenAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(passwordResetTokenAction.fulfilled, (state, action) => {
            state.loading = false;
            state.passwordToken = action?.payload
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(passwordResetTokenAction.rejected, (state, action) => {
            // console.log(action.payload)
            state.loading = false;
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message;
        });

        //Password reset
        builder.addCase(passwordResetAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(passwordResetAction.fulfilled, (state, action) => {
            state.loading = false;
            state.passwordReset = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(passwordResetAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false
        })

        //profile
        builder.addCase(userProfileAction.pending, (state, action) => {
            state.profileLoading = true;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });
        builder.addCase(userProfileAction.fulfilled, (state, action) => {
            state.profile = action?.payload;
            state.profileLoading = false;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });
        builder.addCase(userProfileAction.rejected, (state, action) => {
            state.profileAppErr = action?.payload?.message;
            state.profileServerErr = action?.error?.message;
            state.profileLoading = false;
        });

        //Upload Profile photo
        builder.addCase(uploadProfilePhotoAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
            state.profilePhoto = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(uploadProfilePhotoAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

        //logout
        builder.addCase(logoutAction.pending, (state, action) => {
            state.loading = false;
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined
        })
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false
        })

        //update
        builder.addCase(updateUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetUserAction, (state, action) => {
            state.isUpdated = true;
        })
        builder.addCase(updateUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userUpdated = action?.payload
            state.isUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updateUserAction.rejected, (state, action) => {
            // console.log(action.payload)
            state.loading = false;
            state.appErr = action?.payload?.message
            state.serverErr = action?.error?.message;
        })

        //update password
        builder.addCase(updatePassWordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetPasswordAction, (state, action) => {
            state.isPasswordUpdated = true;
        });
        builder.addCase(updatePassWordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.passwordUpdated = action?.payload;
            state.isPasswordUpdated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updatePassWordAction.rejected, (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //user details
        builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userDetails = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        })
        builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });


        //All users
        builder.addCase(fetchUsersAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.usersList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUsersAction.rejected, (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //All users
        builder.addCase(blockUsersAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(blockUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.block = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(blockUsersAction.rejected, (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //All users
        builder.addCase(unBlockUsersAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(unBlockUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.unblock = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(unBlockUsersAction.rejected, (state, action) => {
            // console.log(action.payload);
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //follow
        builder.addCase(followUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(followUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.followed = action?.payload;
            state.unFollowed = undefined;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(followUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.unFollowed = undefined;
            state.serverErr = action?.error?.message;
        });

        //unFollow
        builder.addCase(unfollowUserAction.pending, (state, action) => {
            state.unfollowLoading = true;
            state.unFollowedAppErr = undefined;
            state.unfollowServerErr = undefined;
        });
        builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
            state.unfollowLoading = false;
            state.unFollowed = action?.payload;
            state.followed = undefined;
            state.unFollowedAppErr = undefined;
            state.unfollowServerErr = undefined;
        });
        builder.addCase(unfollowUserAction.rejected, (state, action) => {
            state.unfollowLoading = false;
            state.unFollowedAppErr = action?.payload?.message;
            state.unfollowServerErr = action?.error?.message;
        });
    }
})

export default usersSlices.reducer;