import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link, useLocation } from "react-router";
import Swal from "sweetalert2";
import {
  Home,
  LayoutList,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  Crown,
} from "lucide-react";
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        Swal.fire("Logged Out!", "You have been logged out.", "success");
      }
    });
  };

  return (
    <div className="bg-black text-amber-50 shadow-md border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto navbar py-3 px-4 md:px-6">
        {/* LEFT: Logo */}
        <div className="navbar-start flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1">
            <div className="p-1 rounded-md bg-amber-50 flex items-center justify-center">
              <Crown size={20} className="text-[#2C6B58]" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-wide">
              ScholarStream
            </span>
          </Link>

          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost p-1 md:ml-115 ml-30">
              <Menu size={25} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#0b143d] rounded-lg w-52 mt-3 p-2 shadow text-white"
            >
              <li className={isActive("/") ? "bg-white/20 rounded" : ""}>
                <Link to="/" className="flex items-center gap-2 px-2 py-1">
                  <Home size={16} /> Home
                </Link>
              </li>
              <li
                className={
                  isActive("/allscholarship") ? "bg-white/20 rounded" : ""
                }
              >
                <Link
                  to="/allscholarship"
                  className="flex items-center gap-2 px-2 py-1"
                >
                  <LayoutList size={16} /> All Scholarships
                </Link>
              </li>
              {!user && (
                <>
                  <li
                    className={
                      isActive("/auth/login") ? "bg-white/20 rounded" : ""
                    }
                  >
                    <Link
                      to="/auth/login"
                      className="flex items-center gap-2 px-2 py-1"
                    >
                      <IoLogIn size={16} /> Login
                    </Link>
                  </li>
                  <li
                    className={
                      isActive("/auth/register") ? "bg-white/20 rounded" : ""
                    }
                  >
                    <Link
                      to="/auth/register"
                      className="flex items-center gap-2 px-2 py-1"
                    >
                      <UserPlus size={16} /> Register
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
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-2 py-1"
                    >
                      <LayoutList size={16} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-2 py-1"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* CENTER MENU (Tablet/Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium gap-1 md:gap-2">
            <li className={isActive("/") ? "bg-white/20 rounded" : ""}>
              <Link
                to="/"
                className="flex items-center gap-1 px-3 py-2 hover:bg-white/10 rounded transition"
              >
                <Home size={16} /> Home
              </Link>
            </li>
            <li
              className={
                isActive("/allscholarship") ? "bg-white/20 rounded" : ""
              }
            >
              <Link
                to="/allscholarship"
                className="flex items-center gap-1 px-3 py-2 hover:bg-white/10 rounded transition"
              >
                <LayoutList size={16} /> All Scholarships
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="navbar-end flex items-center gap-2">
          {!user && (
            <div className="hidden lg:flex gap-2">
              <Link
                to="/auth/login"
                className="btn btn-outline  text-white border-white/50 hover:bg-white/30"
              >
                {" "}
                <IoLogIn size={20} />
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-outline border-white/50 bg-white/10 text-white  hover:bg-white/30"
              >
                {" "}
                <UserPlus size={20} />
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm rounded-lg bg-white/10 text-white font-semibold border border-white/20 hover:bg-white hover:text-black transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg bg-white/10 text-white font-semibold border border-red-400/30 hover:bg-red-500 hover:text-white transition flex items-center gap-1"
              >
                <LogOut size={16} /> Logout
              </button>

              <div className="relative group flex items-center">
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border border-white object-cover"
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
