import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Loading from "../Shared/Loading";
import { Link } from "react-router";
import Banner from "../Component/Banner";
import useRole from "../Hooks/useRole";
import StaticBannerinfo from "../Component/StaticBannerinfo";
import TopScholarships from "./TopScholarships";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole();
  console.log(role);

  return (
    <>
      <Banner></Banner>
      <StaticBannerinfo></StaticBannerinfo>
      <TopScholarships></TopScholarships>
    </>
  );
};

export default HomePage;
