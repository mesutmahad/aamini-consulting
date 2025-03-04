import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { LayoutDashboard, UserCircle, X } from "lucide-react";
import { Button } from "./ui/button";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isDark } = useTheme();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: UserCircle, label: "Profile", path: "/admin/profile" },
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
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out pt-16
          ${!isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
          dark:bg-gray-900 bg-primary text-primary-foreground
          w-56 sm:w-56 md:w-64`}
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

        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 sm:px-6 py-4 transition-colors ${
              location.pathname === item.path
                ? "bg-primary-foreground/10 dark:bg-gray-700"
                : "hover:bg-primary/80 dark:hover:bg-gray-700"
            }`}
            onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
          >
            <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
