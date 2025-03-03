"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import UserProfileDropdown from "./UserProfileDropdown";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavBackground = () => {
    return isDark ? "bg-gray-900 text-white" : "bg-[#2B428C] text-black";
  };

  const handleLogout = () => {
    logout();
    navigate("/src/pages/HomePage.jsx");
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavBackground()} ${
        isScrolled ? "backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={
              isDark
                ? "/assets/Amini Consultation Logo white-01.png"
                : "/assets/Amini Consultation Logo white-01.png"
            }
            alt="Company Logo"
            className="h-20 w-auto"
          />
        </Link>

        {/* Right Side Controls (Nav Links, Theme Toggle, Profile, Logout) */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Nav Links (Hidden on Mobile and when in Admin routes) */}
          {!user && (
            <div className="hidden lg:flex space-x-6">
              {["/", "/services", "/pricing", "/about", "/contact"].map(
                (path, index) => (
                  <NavLink
                    key={index}
                    to={path}
                    active={location.pathname === path}
                    isDark={isDark}
                  >
                    {path === "/"
                      ? "Home"
                      : path.replace("/", "").charAt(0).toUpperCase() +
                        path.slice(2)}
                  </NavLink>
                )
              )}
            </div>
          )}

          {user ? (
            <>
              {/* 1. Theme Toggle Button */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className={`w-8 h-8 p-1 rounded-full shadow-md flex items-center justify-center 
    ${isDark ? "text-white bg-gray-800" : "text-gray-900 bg-white"}`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </Button>

              {/* 2. Profile Icon (UserProfileDropdown) */}
              <UserProfileDropdown />

              {/* 3. User's Name */}
              <span className="hidden lg:inline-block text-white font-medium">
                {user.fullName || user.username}
              </span>
              {/* 4. Logout Button */}
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white text-white bg-red-500 transition-colors"
              >
                <LogOut size={20} />
              </Button>
            </>
          ) : (
            <>
              {/* Theme Toggle for non-logged in users */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className={`w-8 h-8 p-1 rounded-full shadow-md flex items-center justify-center 
    ${isDark ? "text-white bg-gray-800" : "text-gray-900 bg-white"}`}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </Button>

              <Link to="/login" className="hidden lg:block">
                <Button className="bg-green-500 text-white hover:bg-green-600 transition-colors px-4 py-2 rounded-lg">
                  Login
                </Button>
              </Link>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (Positioned to Right Corner) */}
      {isMenuOpen && (
        <div
          className={`lg:hidden absolute top-full right-0 w-56 p-4 shadow-lg border rounded-lg z-50 ${
            isDark ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          {user ? (
            <>
              <div className="py-3 border-b mb-3">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold">
                        {user.fullName?.charAt(0) ||
                          user.username?.charAt(0) ||
                          "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-base">
                      {user.fullName || user.username}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </div>
              <Link
                to="/admin/profile"
                className="block hover:text-gray-200 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Edit Profile
              </Link>
              {location.pathname.startsWith("/admin") ? (
                <Link
                  to="/admin"
                  className="block hover:text-gray-200 py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/admin"
                  className="block hover:text-gray-200 py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Admin Dashboard
                </Link>
              )}
              <div className="border-t mt-2 pt-2">
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              {["/", "/services", "/pricing", "/about", "/contact"].map(
                (path, index) => (
                  <Link
                    key={index}
                    to={path}
                    className="block hover:text-gray-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {path === "/"
                      ? "Home"
                      : path.replace("/", "").charAt(0).toUpperCase() +
                        path.slice(2)}
                  </Link>
                )
              )}
              <div className="border-t mt-2 pt-2">
                <Link to="/login">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, active, children, isDark }) {
  return (
    <Link
      to={to}
      className={`${
        isDark
          ? "text-white hover:text-gray-300"
          : "text-white hover:text-gray-200"
      } transition-colors ${active ? "font-semibold" : "font-normal"}`}
    >
      {children}
    </Link>
  );
}
