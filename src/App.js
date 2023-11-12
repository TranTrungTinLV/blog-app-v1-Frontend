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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />

        <Route path="/" element={<PrivateProtectRoutes/>}>
          <Route path="/create-post" element={<CreatePost />} />
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
