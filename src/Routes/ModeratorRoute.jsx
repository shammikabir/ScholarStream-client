import { Navigate, useLocation } from "react-router";
import useModerator from "../Hooks/useModerator";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isModerator, isModeratorLoading] = useModerator();
  const location = useLocation();

  if (loading || isModeratorLoading) {
    return <p>Loading...</p>;
  }

  if (user && isModerator) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default ModeratorRoute;
