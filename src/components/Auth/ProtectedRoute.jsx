import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return redirect("/login");
  }
  return null;
};

export default ProtectedRoute;
