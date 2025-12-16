import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";
import Loading from "../Shared/Loading";

const AdminRoute = ({ children }) => {
  const [role, loading] = useRole();

  if (loading) return <Loading />;
  if (role === "admin") return children;

  return <Navigate to="/" replace />;
};

export default AdminRoute;
