"use client";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  UserCircle,
  Users,
  UserPlus,
  List,
  ChevronDown,
  LogOut,
  X,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsSidebarOpen(false);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    // { icon: UserCircle, label: "Profile", path: "/admin/profile" },
    {
      icon: Users,
      label: "Users",
      subItems: [
        { icon: List, label: "List Users", path: "/admin/users/list" },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-6 left-0 h-full z-50 transition-transform duration-300 ease-in-out pt-16
          ${!isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
          dark:bg-gray-900 bg-primary text-primary-foreground
          w-56 sm:w-56 md:w-64 flex flex-col`}
      >
        <div className="md:hidden absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {menuItems.map((item, index) =>
            item.subItems ? (
              <div key={index}>
                <button
                  onClick={() => setIsUsersOpen(!isUsersOpen)}
                  className={`flex items-center w-full px-4 sm:px-6 py-4 transition-colors hover:bg-primary/80 dark:hover:bg-gray-700`}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                  <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform ${
                      isUsersOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isUsersOpen && (
                  <div className="ml-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`flex items-center px-4 sm:px-6 py-3 transition-colors ${
                          location.pathname === subItem.path
                            ? "bg-primary-foreground/10 dark:bg-gray-700"
                            : "hover:bg-primary/80 dark:hover:bg-gray-700"
                        }`}
                        onClick={() =>
                          window.innerWidth < 768 && setIsSidebarOpen(false)
                        }
                      >
                        <subItem.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span className="text-sm">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-4 sm:px-6 py-4 transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary-foreground/10 dark:bg-gray-700"
                    : "hover:bg-primary/80 dark:hover:bg-gray-700"
                }`}
                onClick={() =>
                  window.innerWidth < 768 && setIsSidebarOpen(false)
                }
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
