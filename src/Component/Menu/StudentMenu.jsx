// components/StudentMenu.jsx
import { MdDashboard, MdClass, MdPayment } from "react-icons/md";
import MenuItem from "./MenuItem";

const StudentMenu = () => {
  return (
    <div>
      <MenuItem
        label="Student Dashboard"
        address="/student/dashboard"
        icon={MdDashboard}
      />
      <MenuItem label="My Courses" address="/student/courses" icon={MdClass} />
      <MenuItem label="Payments" address="/student/payments" icon={MdPayment} />
    </div>
  );
};

export default StudentMenu;
