import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ component }: any) => {
  const { user } = useContext(AuthContext);

  return user ? component : <Navigate to="/signin" />;
};

export default ProtectedRoute;
