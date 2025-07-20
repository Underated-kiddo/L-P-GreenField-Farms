import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle, LogOut, Settings } from "lucide-react";

const Sidebar = ({ role, active }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profilePic = localStorage.getItem("profilePic"); // stored after upload

  return (
    <aside className="w-64 min-h-screen bg-gray-100/90 dark:bg-gray-950/90 shadow-xl rounded-r-2xl p-6 flex flex-col justify-between border-r border-gray-200 dark:border-gray-900 transition-all duration-300">
      <nav className="flex flex-col gap-1">
        <SidebarLink to="/dashboard" label="Dashboard" active={active === "dashboard"} />
        <SidebarLink to="/account" label="Account" active={active === "account"} />
        <SidebarLink to="/chats" label="Chats" active={active === "chats"} />
        <SidebarLink to="/services" label="Services" active={active === "services"} />
        {role === "farmer" && <SidebarLink to="/farming-tips" label="Farming Tips" active={active === "farming-tips"} />}
        {role === "farmer" && <SidebarLink to="/stats" label="Stats" active={active === "stats"} />}
        {role === "customer" && <SidebarLink to="/cart" label="Cart" active={active === "cart"} />}
        {role === "customer" && <SidebarLink to="/hot-deals" label="Hot Deals" active={active === "hot-deals"} />}
        {role === "admin" && <SidebarLink to="/admin" label="Admin Panel" active={active === "admin"} />}
        <SidebarLink to="/settings" label="Settings" active={active === "settings"} />
      </nav>

      <div className="relative mt-4">
        <div
          className="cursor-pointer flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <img
            src={profilePic || "https://api.dicebear.com/7.x/identicon/svg?seed=User"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
          />
          <span className="font-medium text-gray-700 dark:text-gray-200">Me</span>
        </div>

        {showProfileMenu && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 w-48 z-50 border dark:border-gray-700">
            <div className="text-center mb-3">
              <img
                src={profilePic || "https://api.dicebear.com/7.x/identicon/svg?seed=User"}
                className="w-14 h-14 mx-auto rounded-full border border-primary-500"
              />
              <p className="text-sm font-semibold mt-2 text-gray-800 dark:text-gray-100">
                {localStorage.getItem("name") || "User"}
              </p>
            </div>
            <Link
              to="/account"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded"
            >
              <UserCircle className="w-5 h-5" /> Account
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded"
            >
              <Settings className="w-5 h-5" /> Settings
            </Link>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="w-full flex items-center gap-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 px-3 py-2 mt-2 rounded"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400
      ${active
        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 shadow'
        : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-400'
      }`}
  >
    {label}
  </Link>
);

export default Sidebar;
