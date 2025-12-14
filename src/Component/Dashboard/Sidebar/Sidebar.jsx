import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { BsSpeedometer, BsPeople, BsListCheck, BsPerson } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { Link, useLocation } from "react-router";
import useRole from "../../../Hooks/useRole";
import { Crown } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (isRoleLoading) return <div>Loading...</div>;

  let menuItems = [];

  if (role === "admin") {
    menuItems = [
      { label: "My Profile", icon: BsPerson, to: "/dashboard" },
      {
        label: "Add Scholarship",
        icon: BsListCheck,
        to: "/dashboard/addscholarship",
      },
      {
        label: "Manage Scholarships",
        icon: BsListCheck,
        to: "/dashboard/managescholarship",
      },
      { label: "Manage Users", icon: BsPeople, to: "/dashboard/manageuser" },
      { label: "Analytics", icon: BsSpeedometer, to: "/dashboard/analytics" },
    ];
  } else if (role === "moderator") {
    menuItems = [
      { label: "My Profile", icon: BsPerson, to: "/dashboard" },
      {
        label: "Manage Applications",
        icon: BsListCheck,
        to: "/dashboard/applications",
      },
      { label: "All Reviews", icon: BsListCheck, to: "/dashboard/reviews" },
    ];
  } else if (role === "student") {
    menuItems = [
      { label: "My Profile", icon: BsPerson, to: "/dashboard" },
      {
        label: "My Applications",
        icon: BsListCheck,
        to: "/dashboard/myapplications",
      },
      { label: "My Reviews", icon: BsListCheck, to: "/dashboard/my-reviews" },
    ];
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-black text-white">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button onClick={() => setOpen(!open)}>
          <AiOutlineBars size={25} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 
        bg-linear-to-b from-[#1a3c30] via-[#276B51] to-[#2C6B58]
        text-white w-64 transform h-full flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition duration-300`}
      >
        {/* TOP – Header */}
        <div className="p-6 bg-black flex items-center gap-3 border-b border-white/20">
          <div className="p-2 rounded-md bg-amber-50 flex items-center justify-center">
            <Crown size={22} className="text-[#2C6B58] font-bold" />
          </div>
          <h1 className="text-xl font-bold tracking-wide">ScholarStream</h1>
        </div>

        {/* MENU */}
        <nav className="mt-6 space-y-2 px-4 flex-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={index}
                to={item.to}
                className={`flex items-center gap-3 p-3 rounded-lg transition 
                  backdrop-blur-sm 
                  ${
                    isActive ? "bg-white/30 font-semibold" : "hover:bg-white/20"
                  }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT (Bottom Fixed) */}
        <div className="px-4 mb-5">
          <button
            className="flex items-center gap-3 p-3 w-full rounded-lg 
            hover:bg-red-500/80 bg-white/10 border border-white/20 transition"
          >
            <GrLogout size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
