import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";

const useModerator = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: isModerator, isLoading } = useQuery({
    queryKey: ["isModerator", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/moderator/${user.email}`);
      return res.data.moderator;
    },
  });

  return [isModerator, isLoading];
};

export default useModerator;
