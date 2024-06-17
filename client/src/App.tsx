import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found";
import SignUp from "./pages/signup";

// Routes
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <div className="flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route index path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
