import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link, useLocation } from "react-router";
import {
  Home,
  LayoutList,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  Crown,
} from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const location = useLocation();

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-black text-amber-50 shadow-md border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto navbar py-3">
        {/* LEFT: PREMIUM WHITE LOGO */}
        <div className="navbar-start flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-amber-50 flex items-center justify-center">
              <Crown size={22} className="text-[#2C6B58] font-bold" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">
              ScholarStream
            </span>
          </Link>

          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden ml-2">
            <label tabIndex={0} className="btn btn-ghost">
              <Menu size={22} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#0b143d] rounded-lg w-52 mt-3 p-2 shadow text-white"
            >
              <li className={isActive("/") ? "bg-white/20 rounded" : ""}>
                <Link to="/" className="flex items-center gap-2">
                  <Home size={18} /> Home
                </Link>
              </li>
              <li
                className={
                  isActive("/scholarships") ? "bg-white/20 rounded" : ""
                }
              >
                <Link to="/allscholarship" className="flex items-center gap-2">
                  <LayoutList size={18} /> All Scholarships
                </Link>
              </li>

              {!user && (
                <>
                  <li
                    className={
                      isActive("/auth/login") ? "bg-white/20 rounded" : ""
                    }
                  >
                    <Link to="/auth/login" className="flex items-center gap-2">
                      <LogIn size={18} /> Login
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/auth/register") ? "bg-white/20 rounded" : ""
                    }
                  >
                    <Link
                      to="/auth/register"
                      className="flex items-center gap-2"
                    >
                      <UserPlus size={18} /> Register
                    </Link>
                  </li>
                </>
              )}

              {user && (
                <>
                  <li
                    className={
                      isActive("/dashboard") ? "bg-white/20 rounded" : ""
                    }
                  >
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="flex items-center gap-2"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* CENTER MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium gap-2">
            <li className={isActive("/") ? "bg-white/20 rounded" : ""}>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded transition"
              >
                <Home size={18} /> Home
              </Link>
            </li>
            <li
              className={isActive("/scholarships") ? "bg-white/20 rounded" : ""}
            >
              <Link
                to="/allscholarship"
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded transition"
              >
                <LayoutList size={18} /> All Scholarships
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="navbar-end flex items-center gap-3">
          {/* Logged Out */}
          {!user && (
            <div className="flex gap-2">
              <Link
                to="/auth/login"
                className="btn btn-outline btn-sm text-white border-white/50 hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-sm bg-white/10 text-white border-none hover:bg-white/20"
              >
                Register
              </Link>
            </div>
          )}

          {/* Logged In */}
          {user && (
            <div className="flex items-center gap-3">
              {/* Dashboard Button */}
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm rounded-lg bg-white/10 text-white font-semibold border border-white/20 hover:bg-white hover:text-black transition"
              >
                Dashboard
              </Link>

              {/* Logout Button */}
              <button
                onClick={logOut}
                className="px-4 py-2 text-sm rounded-lg bg-white/10 text-white font-semibold border border-red-400/30 hover:bg-red-500 transition flex items-center gap-1"
              >
                <LogOut size={18} /> Logout
              </button>

              {/* Profile Pic with Hover Tooltip */}
              <div className="relative group flex items-center">
                <img
                  src={user?.photoURL}
                  className="w-12 h-12 rounded-full border border-white object-cover "
                  alt="user"
                />
                <span className="absolute top-1/2 left-full ml-2 px-2 py-1 text-xs rounded bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap -translate-y-1/2">
                  {user.displayName || user.email}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
