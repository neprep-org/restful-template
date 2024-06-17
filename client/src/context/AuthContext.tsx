import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../utils/axios.util";
import showToast from "../utils/errorToasts";
import { CookiesProvider, useCookies } from "react-cookie";

const AuthContext = createContext({} as any);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as any);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();
  const location = useLocation();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      let response: any = await axios.post("users/login", { email, password });

      if (response.status === 201) {
        response = response.data;

        const loggedInUser = {
          email: response.data.email,
          id: response.data.id,
          token: response.data.token,
        };

        const expires = new Date(Date.now() + 1000 * 60 * 60); // Set cookie to expire in 1 hour

        setCookie("user", JSON.stringify(loggedInUser), { path: "/", expires });
        setUser(loggedInUser);
        showToast(response.message, "success");
        navigate("/dashboard");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error: any) {
      if (error.response) {
        showToast(error.response.data.message, "error");
      } else {
        showToast(error.message, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      let response: any = await axios.post("users/signup", { email, password });

      if (response.status === 201) {
        response = response.data;

        const signedUpUser = {
          email: response.data.email,
          id: response.data.id,
          token: response.data.token,
        };

        const expires = new Date(Date.now() + 1000 * 60 * 60); // Set cookie to expire in 1 hour

        setCookie("user", JSON.stringify(signedUpUser), { path: "/", expires });
        setUser(signedUpUser);

        showToast(response.message, "success");
        navigate("/dashboard");
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error: any) {
      if (error.response) {
        showToast(error.response.data.message, "error");
      } else {
        showToast(error.message, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    removeCookie("user", { path: "/" });
    showToast("Logged out successfully", "success");
    navigate("/signin");
  };

  // Check if user is already logged in on initial render
  useEffect(() => {
    const storedUser = cookies.user ? cookies.user : null;

    if (storedUser) {
      setUser(storedUser);
      if (
        location.pathname === "/signin" ||
        location.pathname === "/signup" ||
        location.pathname === "/"
      ) {
        navigate("/dashboard");
      } else {
        navigate(location.pathname);
      }
    } else {
      setUser(null);
      if (
        location.pathname === "/dashboard" ||
        location.pathname === "/dashboard/*"
      ) {
        navigate("/signin");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CookiesProvider>
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          signup,
          isLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </CookiesProvider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
