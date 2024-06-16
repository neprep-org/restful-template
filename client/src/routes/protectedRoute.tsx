import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
