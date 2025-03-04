"use client";

import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import EditProfile from "../components/EditProfile";
import CreateUser from "../components/CreateUser";
import ListUsers from "../components/ListUsers";
import { Menu } from "lucide-react";
import { Button } from "../components/ui/button";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center h-16 px-4 bg-background border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mr-4 md:flex hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-colors ${
          isDark
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-1 pt-16">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main
          className={`flex-1 transition-all duration-300 p-4 sm:p-6 ${
            isSidebarOpen ? "md:ml-64 sm:ml-56" : "ml-0"
          }`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/list" element={<ListUsers />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
