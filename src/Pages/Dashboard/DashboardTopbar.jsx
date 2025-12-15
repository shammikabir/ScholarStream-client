import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { Home, LayoutList } from "lucide-react";
import { Search, Bell } from "lucide-react";

const DashboardTopBar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="
       
        h-22 bg-black text-white
        ml-64 w-[calc(100%-16rem)]
        flex items-center justify-between 
        
      "
    >
      {/* LEFT EMPTY (for balance) */}
      <div className="w-1/3"></div>

      {/* CENTER MENU */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${isActive("/") ? "bg-white/20" : "hover:bg-white/30"}`}
        >
          <Home size={18} />
          Home
        </Link>

        <Link
          to="/allscholarship"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${
              isActive("/allscholarship") ? "bg-white/20" : "hover:bg-white/30"
            }`}
        >
          <LayoutList size={18} />
          All Scholarships
        </Link>
      </div>

      {/* RIGHT USER PROFILE */}
      <div className="w-1/3 flex justify-end items-center gap-4 mr-20">
        {/* Search Icon */}
        <button
          className="p-2 rounded-full hover:bg-white/20 transition"
          title="Search"
        >
          <Search size={20} />
        </button>

        {/* Notification Icon */}
        <button
          className="relative p-2 rounded-full hover:bg-white/20 transition"
          title="Notifications"
        >
          <Bell size={20} />

          {/* Notification Dot */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        {user && (
          <div className="relative group ml-2">
            <img
              src={user.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full border border-white/30 object-cover cursor-pointer"
            />

            {/* Hover Name Tooltip */}
            <span
              className="
          absolute top-1/2 right-full mr-3
          -translate-y-1/2
          bg-white text-black text-xs
          px-2 py-1 rounded
          opacity-0 group-hover:opacity-100
          transition whitespace-nowrap
        "
            >
              {user.displayName || user.email}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTopBar;
