import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Shared/Loading";
import { Link } from "react-router";
import Banner from "../Component/Banner";
import useRole from "../Hooks/useRole";
import StaticBannerinfo from "../Component/StaticBannerinfo";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole();
  console.log(role);

  return (
    <>
      <Banner></Banner>
      <StaticBannerinfo></StaticBannerinfo>
      {/* <div className="p-4 text-center">
        <p className="mb-4">User: {user?.email || "Not logged in"}</p>
        <p className="mb-4">User: {role}</p>
        <div className="flex justify-center gap-4">
          <Link to="/auth/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/auth/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
