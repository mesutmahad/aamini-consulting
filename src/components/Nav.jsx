"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

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

        {/* Right Side Controls (Nav Links, Theme Toggle, Login/Logout) */}
        <div className="ml-auto flex items-center space-x-6">
          {/* Nav Links (Hidden on Mobile) */}
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

          {/* Theme Toggle Button */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className={`w-8 h-8 p-1 rounded-full shadow-md flex items-center justify-center 
    ${isDark ? "text-white bg-gray-800" : "text-gray-900 bg-white"}`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>

          {/* Login/Logout Button */}
          {user ? (
            <Button
              onClick={handleLogout}
              className="hidden lg:block bg-red-500 text-white hover:bg-red-600 transition-colors px-4 py-2 rounded-lg"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" className="hidden lg:block">
              <Button className="bg-green-500 text-white hover:bg-green-600 transition-colors px-4 py-2 rounded-lg">
                Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Positioned to Right Corner) */}
      {isMenuOpen && (
        <div
          className={`lg:hidden absolute top-full right-0 w-56 p-4 shadow-lg border rounded-lg z-50 ${
            isDark ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
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
            {user ? (
              <Button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
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
