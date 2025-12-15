import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { Home, LayoutList, Search, Bell } from "lucide-react";

const DashboardTopBar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="
        h-22 bg-black text-white
        flex items-center justify-between
        px-4 md:px-6
        w-full
        lg:ml-64 lg:w-[calc(100%-16rem)]
        overflow-x-hidden
        md:ml-3
      
      "
    >
      {/* LEFT (Mobile: Logo space / Desktop: balance) */}
      <div className="flex items-center gap-3">
        {/* Mobile view: page title */}
        <Link to="/" className="text-2xl hover:underline md:hidden">
          Home
        </Link>
      </div>

      {/* CENTER MENU (Hide on mobile) */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${isActive("/") ? "bg-white/20" : "hover:bg-white/10"}`}
        >
          <Home size={18} />
          Home
        </Link>

        <Link
          to="/allscholarship"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${
              isActive("/allscholarship") ? "bg-white/20" : "hover:bg-white/10"
            }`}
        >
          <LayoutList size={18} />
          All Scholarships
        </Link>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="p-2 rounded-full hover:bg-white/20 transition md:hidden lg:block">
          <Search size={18} />
        </button>

        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-white/20 transition md:hidden lg:block">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        {user && (
          <div className="relative group">
            <img
              src={user.photoURL}
              alt="user"
              className="w-9 h-9 rounded-full border border-white/30 object-cover cursor-pointer"
            />

            {/* Tooltip */}
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
