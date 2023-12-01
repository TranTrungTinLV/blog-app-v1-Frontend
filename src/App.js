import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from '../src/components/Users/Register/Register'
import Login from "./components/Users/Login/Login";
import Navbar from "./components/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCateogory";
import PrivateProtectRoutes from "./components/Navigation/ProtectRoutes/PrivateProtectRoutes";
import AdminRoute from "./components/Navigation/ProtectRoutes/AdminRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/updatePosts";
import UpdateComment from "./components/Coments/UpdateComment";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import SendEmail from "./components/Users/Emailmsg/SendEmail";
import AccountVerified from "./components/Users/AccountVerify/AccountVerified";
import UsersList from "./components/Users/UserList/UsersList";
import UpdatePassword from "./components/Users/PassWordManagerment/UpdatePassword";
import ResetPassword from "./components/Users/PassWordManagerment/ResetPassword";
import ResetPasswordForm from "./components/Users/PassWordManagerment/ResetPasswordForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/' element={<AdminRoute />}>
        </Route>
        <Route path="/password-reset-token" element={<ResetPasswordForm />} />
        <Route exact path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="/" element={<PrivateProtectRoutes />}>
          <Route excact path="/posts/:id" element={<PostDetails />} />
          <Route excact path="/update-comment/:id" element={<UpdateComment />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route excact path="/posts" element={<PostsList />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
        </Route>
        <Route path="/" element={<PrivateProtectRoutes />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/verify-token/:token" element={<AccountVerified />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfileForm />} />
          <Route path="/upload-profile-photo" element={<UploadProfilePhoto />} />
          <Route path="/send-mail" element={<SendEmail />} />

        </Route>
        <Route path="/" element={<AdminRoute />}>
          <Route path="/users" element={<UsersList />} />
        </Route>
        <Route path="/" element={<AdminRoute />}>
          <Route path="add-category" element={<AddNewCategory />} />
        </Route>
        <Route exact path='/' element={<AdminRoute />}>
          <Route exact path="/update-category/:id" element={<UpdateCategory />} />
        </Route>
        <Route exact path='/' element={<AdminRoute />}>
          <Route exact path="/category-list" element={<CategoryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
