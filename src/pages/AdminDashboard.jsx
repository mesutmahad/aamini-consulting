"use client";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import EditProfile from "../components/EditProfile";
// import Nav from "../components/Nav" //Removed as per update

export default function AdminDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-1 pt-16">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          } p-6`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<EditProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
