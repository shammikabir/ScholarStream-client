import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../Component/Dashboard/Sidebar/Sidebar";
import Navbar from "../Shared/Navbar";
import DashboardTopbar from "../Pages/Dashboard/DashboardTopbar";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardTopbar></DashboardTopbar>
      <div className="relative min-h-screen md:flex bg-linear-to-b from-[#e9f7f3] to-[#ffffff]">
        {/* Left Side: Sidebar Component */}
        <Sidebar />
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1  md:ml-64">
          <div className="p-5 ">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
