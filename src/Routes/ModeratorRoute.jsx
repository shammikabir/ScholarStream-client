import { Navigate } from "react-router";

import useRole from "../Hooks/useRole";
import Loading from "../Shared/Loading";

const ModeratorRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading></Loading>;
  if (role === "moderator") return children;
  return <Navigate to="/" replace="true" />;
};

export default ModeratorRoute;
