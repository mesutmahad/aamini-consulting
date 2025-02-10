"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/icons/input";
import { PasswordInput } from "../components/icons/password-input";
import { Button } from "../components/icons/button";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className={`h-screen mt-20 max-h-screen w-full flex items-center justify-center p-4 transition-colors duration-200 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          isDark ? "bg-gray-800 text-yellow-300" : "bg-gray-200 text-gray-800"
        }`}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div
        className={`w-full max-w-md space-y-8 p-6 rounded-lg transition-all duration-200 ${
          isDark ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        {/* Centered Logo */}
        <div className="flex justify-center">
          <img
            src="/assets/Amini Consultation Logo white-01.png"
            alt="Company Logo"
            className="h-20 w-auto mt-4"
          />
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
          <p
            className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className={`block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                required
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`${
                  isDark ? "bg-[#2C2C2C] text-white" : "bg-white text-gray-900"
                } border-0 placeholder:text-gray-500 h-12`}
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <PasswordInput
                id="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${
                  isDark ? "bg-[#2C2C2C] text-white" : "bg-white text-gray-900"
                } border-0 placeholder:text-gray-500 h-12`}
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-green-500 hover:text-green-400"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-base font-medium"
          >
            Sign In
          </Button>
        </form>

        {/* Terms and Privacy */}
        <p
          className={`text-center text-sm ${
            isDark ? "text-gray-500" : "text-gray-600"
          }`}
        >
          © 2025 Amini Consultation. All rights reserved.
        </p>
      </div>
    </div>
  );
}
