"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavBackground = () => {
    return isDark ? "bg-gray-900" : "bg-[#2B428C]";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavBackground()} ${
        isScrolled ? "backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 relative flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/src/App.jsx" className="flex items-center">
          <img
            src={
              isDark
                ? "/assets/Amini Consultation Logo white-01.png"
                : "/assets/Amini Consultation Logo-02.png"
            }
            alt="Company Logo"
            className="h-20 w-auto" // Decreased size
          />
        </Link>

        {/* Navigation Links (Reduced Spacing & Font Size) */}
        <div className="hidden lg:flex items-center space-x-6 text-lg">
          <NavLink to="/" active={location.pathname === "/"} isDark={isDark}>
            Home
          </NavLink>
          <NavLink
            to="/services"
            active={location.pathname === "/services"}
            isDark={isDark}
          >
            Services
          </NavLink>
          <NavLink
            to="/pricing"
            active={location.pathname === "/pricing"}
            isDark={isDark}
          >
            Pricing
          </NavLink>
          <NavLink
            to="/about"
            active={location.pathname === "/about"}
            isDark={isDark}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            active={location.pathname === "/contact"}
            isDark={isDark}
          >
            Contact
          </NavLink>
        </div>

        {/* Right Side Controls (Theme Toggle + Login Button) */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button (Smaller & Compact) */}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="w-8 h-8 p-1 rounded-full shadow-md text-black bg-white flex items-center justify-center"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </Button>

          {/* Login Button (Compact Size) */}
          <Button
            className={`px-4 py-2 text-lg font-medium ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-[#47C263] hover:bg-[#47C263]/90"
            } text-white`}
          >
            Login
          </Button>
        </div>
      </div>
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
