import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  // Fetch users from backend with optional role filter
  const fetchUsers = async (role = "all") => {
    const url = `${import.meta.env.VITE_API_URL}/users/filter?role=${role}`;

    const res = await axios.get(url);

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
      const { data } = await axios.put(
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
        const { data } = await axios.delete(
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
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Role:</label>
        <select
          className="border p-1 rounded"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-[#1b4636] text-white text-sm sticky top-0 z-10">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map((user, index) => (
              <tr key={user.email} className="hover:bg-gray-100 transition-all">
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2">
                  {/* Role change dropdown */}
                  <select
                    className="border p-1 rounded"
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.email, e.target.value)
                    }
                  >
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
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
    </div>
  );
};

export default ManageUser;
