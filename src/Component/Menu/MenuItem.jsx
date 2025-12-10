import { Link, useLocation } from "react-router";

const MenuItem = ({ icon: Icon, label, address }) => {
  const location = useLocation();
  const isActive = location.pathname === address;

  return (
    <Link
      to={address}
      className={`flex items-center px-4 py-2 my-1 rounded-md transition
        ${isActive ? "bg-lime-300 font-semibold" : "hover:bg-gray-200"}
      `}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-3">{label}</span>
    </Link>
  );
};

export default MenuItem;
