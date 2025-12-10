import { useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthContext";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email, // wait until user email available
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/role/${user.email}` // email path param
      );
      return response.data.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
