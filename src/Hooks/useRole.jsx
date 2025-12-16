import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const token = localStorage.getItem("access-token");

  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["role"],
    enabled: !loading && !!user && !!token, //  TOKEN CHECK
    queryFn: async () => {
      const res = await axiosSecure.get("/user/role");
      return res.data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
