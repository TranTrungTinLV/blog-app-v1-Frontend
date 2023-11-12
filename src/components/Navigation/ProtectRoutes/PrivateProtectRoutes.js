import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateProtectRoutes = ({ element:Component, ...rest }) => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  // If the user is authenticated, render the element:Component, ...reset, otherwise redirect to the login page
  return userAuth ? <Outlet/> : <Navigate to="/login" />;
}; 

export default PrivateProtectRoutes;
