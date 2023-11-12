import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  // If the user is authenticated and is an admin, render the Outlet (which will render the child routes),
  // otherwise redirect to the login page
  return userAuth?.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}; 

export default AdminRoute;