import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Logo from "../components/logo";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();
  if (user) navigate("/dashboard");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <Logo />
        <h2 className="text-2xl text-center mt-[-6px] mb-8">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 outline-none focus:border-primary"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2 outline-none focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark disabled:bg-primary-light disabled:cursor-wait"
          disabled={isLoading}
        >
          Sign in
        </button>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            New here?{" "}
            <Link to="/signup" className="text-primary hover:text-primary-dark">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
