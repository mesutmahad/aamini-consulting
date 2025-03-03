import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { LayoutDashboard, UserCircle } from "lucide-react";

const Sidebar = ({ isSidebarOpen }) => {
  const { isDark } = useTheme();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: UserCircle, label: "Profile", path: "/admin/profile" },
  ];

  return (
    <div
      className={`fixed top-10 left-0 h-full w-64 transition-transform duration-300 ease-in-out ${
        !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
      } dark:bg-gray-900 bg-primary text-primary-foreground pt-16`}
    >
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center px-6 py-4 transition-colors ${
            location.pathname === item.path
              ? "bg-primary-foreground/10 dark:bg-gray-700"
              : "hover:bg-primary/80 dark:hover:bg-gray-700"
          }`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
