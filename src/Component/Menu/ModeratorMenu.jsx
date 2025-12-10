// components/ModeratorMenu.jsx
import { MdDashboard, MdCheckCircle, MdReport } from "react-icons/md";
import MenuItem from "./MenuItem";

const ModeratorMenu = () => {
  return (
    <div>
      <MenuItem
        label="Moderator Dashboard"
        address="/moderator/dashboard"
        icon={MdDashboard}
      />
      <MenuItem
        label="Approve Posts"
        address="/moderator/approve"
        icon={MdCheckCircle}
      />
      <MenuItem label="Reports" address="/moderator/reports" icon={MdReport} />
    </div>
  );
};

export default ModeratorMenu;
