import { Outlet, Navigate } from "react-router-dom"
import React from "react";

const ProtectedRoute = (props) => {
  return props.loggedIn ? <Outlet/> : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;