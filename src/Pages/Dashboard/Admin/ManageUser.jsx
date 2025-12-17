import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const axiosSecure = useAxiosSecure();

  // Fetch users from backend with optional role filter
  const fetchUsers = async (role = "all") => {
    const url = `${import.meta.env.VITE_API_URL}/users/filter?role=${role}`;

    const res = await axiosSecure.get(url);

    if (res.data.success) {
      setUsers(res.data.users);
    } else {
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  useEffect(() => {
    fetchUsers(filterRole);
  }, [filterRole]);

  // Handle role change
  const handleRoleChange = async (email, newRole) => {
    try {
      const { data } = await axiosSecure.put(
        `${import.meta.env.VITE_API_URL}/user/update-role/${email}`,
        { role: newRole }
      );
      if (data.success) {
        Swal.fire("Success", "User role updated successfully", "success");
        fetchUsers(filterRole); // refresh list
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  // Handle delete user
  const handleDelete = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D00000",
      cancelButtonColor: "#B0B0B0",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(
          `${import.meta.env.VITE_API_URL}/user/${email}`
        );
        if (data.success) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers(filterRole); // refresh list
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Manage Users</h2>

      {/* Filter */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center items-center justify-center mt-3 ">
        <label className="font-semibold">Filter by Role:</label>
        <select
          className="border px-5 py-2 rounded-md lg:max-w-xs"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* ===== DESKTOP  ===== */}
      <div className="hidden lg:block md:hidden overflow-x-auto border rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-[#1b4636] text-white text-sm ">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm bg-white">
            {users.map((user, index) => (
              <tr key={user.email} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td className="break-all">{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="flex flex-col lg:flex-row gap-2 justify-center">
                    <select
                      className="border px-2 py-1 rounded"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.email, e.target.value)
                      }
                    >
                      <option value="student">Student</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>

                    <button
                      onClick={() => handleDelete(user.email)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="lg:hidden md:block space-y-4">
        {users.map((user, index) => (
          <div
            key={user.email}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <p className="text-sm text-gray-500">#{index + 1}</p>
            <h3 className="font-semibold text-lg">{user.name || "N/A"}</h3>
            <p className="text-sm break-all text-gray-600">{user.email}</p>

            <div className="mt-3">
              <span className="text-sm font-medium">Role:</span>
              <select
                className="border w-full mt-1 px-2 py-2 rounded"
                value={user.role}
                onChange={(e) => handleRoleChange(user.email, e.target.value)}
              >
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              onClick={() => handleDelete(user.email)}
              className="w-full mt-3 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Delete User
            </button>
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
