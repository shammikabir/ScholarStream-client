import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Component/Loading";
import { Link } from "react-router";

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="p-4 text-center">
          <p className="mb-4">User: {user?.email || "Not logged in"}</p>
          <div className="flex justify-center gap-4">
            <Link to="/auth/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
