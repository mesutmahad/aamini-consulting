"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { MessageSquare, Users, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import Nav from "../components/Nav";

const users = [
  {
    name: "Abdalla Abdirahman",
    email: "Abdalla@gmail.com",
    phone: "+2526160 X0 7X",
    description:
      "Lorem ipsum dolor sit amet consectetur. Donec aliquam amet mattis nisi convallis.",
  },
  {
    name: "Mohamed Ali Hussein",
    email: "Mohamed@gmail.com",
    phone: "+2526160 X0 7X",
    description:
      "Amet lectus lobortis sagittis nam. Ac pharetra semper commodo et. Sed etiam elementum enim nibh quam.",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Nav />
      <div className="flex flex-1 mt-20">
        {/* Sidebar Toggle Button for Mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`lg:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 ${
            isDark ? "bg-gray-800" : "bg-[#2B428C]"
          } text-white mt-20 lg:mt-0`}
        >
          <nav className="mt-8">
            <Button
              className={`flex items-center w-full px-4 py-6 mb-3 ${
                isDark
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
            >
              <MessageSquare className="mr-3 h-5 w-5" /> Messages
            </Button>
            <Button
              className={`flex items-center w-full px-4 py-6 ${
                isDark
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
            >
              <Users className="mr-3 h-5 w-5" /> Users
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 overflow-auto p-4 md:p-6 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-xl md:text-2xl font-semibold mb-6">Dashboard</h1>
          <div className="grid gap-4 md:gap-6">
            {users.map((user, index) => (
              <div
                key={index}
                className={`rounded-lg shadow p-4 md:p-6 hover:shadow-md transition-shadow ${
                  isDark ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold">
                      {user.name}
                    </h2>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <span className="text-gray-500 md:text-right">
                    {user.phone}
                  </span>
                </div>
                <p className="mt-4 text-gray-500">{user.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
