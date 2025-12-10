// components/AdminMenu.jsx
import { MdDashboard, MdPeople, MdSettings } from "react-icons/md";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <div>
      <MenuItem
        label="Admin Dashboard"
        address="/admin/dashboard"
        icon={MdDashboard}
      />
      <MenuItem label="Manage Users" address="/admin/users" icon={MdPeople} />
      <MenuItem
        label="Admin Settings"
        address="/admin/settings"
        icon={MdSettings}
      />
    </div>
  );
};

export default AdminMenu;
