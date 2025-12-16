// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";

// import { useContext } from "react";
// import { AuthContext } from "../Provider/AuthContext";

// const useAdmin = () => {
//   const { user, loading } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   const { data: isAdmin = false, isLoading } = useQuery({
//     queryKey: ["isAdmin", user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/user/role/${user.email}`);

//       //  return something
//       return res?.data?.role === "admin";
//     },
//   });
// //
//   return [isAdmin, isLoading];
// };

// export default useAdmin;
