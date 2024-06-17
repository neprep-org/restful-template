import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
