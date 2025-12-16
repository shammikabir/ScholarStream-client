import { Navigate, useLocation } from "react-router";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <p>Loading...</p>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AdminRoute;
