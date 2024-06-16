import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md flex justify-center items-center flex-col">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <Link to="/" className="text-primary-dark text-lg hover:underline">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
