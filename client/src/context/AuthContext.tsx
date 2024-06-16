import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../utils/axios.util";
import showToast from "../utils/errorToasts";

const AuthContext = createContext({} as any);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as any);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const login = async (email: string, password: string) => {
    try {
      let response: any = await axios.post("users/login", { email, password });

      if (response.status === 201) {
        setIsAuthenticating(false);
        response = response.data;

        const loggedInUser = {
          email: response.data.email,
          id: response.data.id,
          token: response.data.token,
        };

        setUser(loggedInUser);
        localStorage.setItem("ne-user", JSON.stringify(user));
        showToast(response.message, "success");
        navigate("/dashboard");
      } else {
        setIsAuthenticating(false);
        showToast(response.data.message, "error");
      }
    } catch (error: any) {
      setIsAuthenticating(false);
      if (error.response) {
        showToast(error.response.data.message, "error");
      } else {
        showToast(error.message, "error");
      }
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      let response: any = await axios.post("users/signup", { email, password });

      if (response.status === 201) {
        setIsAuthenticating(false);
        response = response.data;

        const signedUpUser = {
          email: response.data.email,
          id: response.data.id,
          token: response.data.token,
        };

        setUser(signedUpUser);
        localStorage.setItem("ne-user", JSON.stringify(user));
        showToast(response.message, "success");
        navigate("/dashboard");
      } else {
        setIsAuthenticating(false);
        showToast(response.data.message, "error");
      }
    } catch (error: any) {
      setIsAuthenticating(false);
      if (error.response) {
        showToast(error.response.data.message, "error");
      } else {
        showToast(error.message, "error");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ne-user");
    navigate("/signin");
  };

  // Check if user is already logged in on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("ne-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, isAuthenticating }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
