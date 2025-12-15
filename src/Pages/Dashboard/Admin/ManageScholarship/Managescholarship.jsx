import { useState, useEffect } from "react";
import axios from "axios";
import UpdateScholarship from "./UpdateScholarship";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholar, setSelectedScholar] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Fetch all scholarships
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/allscholarships`)
      .then((res) => setScholarships(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Update scholarship in list after edit
  const handleUpdate = (updatedScholar) => {
    setScholarships((prev) =>
      prev.map((sch) => (sch._id === updatedScholar._id ? updatedScholar : sch))
    );
  };

  // Delete scholarship
  const handleDelete = async (id) => {
    // Show confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D00000",
      cancelButtonColor: "#B0B0B0",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/scholarships/${id}`
        );

        if (data.success) {
          setScholarships((prev) => prev.filter((sch) => sch._id !== id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Scholarship has been deleted.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete scholarship.",
        });
      }
    }
  };

  return (
    <div className="p-4 md:p-0">
      {/* Desktop TABLE */}
      <div className="hidden lg:block md:hidden overflow-x-auto shadow-xl rounded-xl border border-gray-200">
        <table className="table w-full">
          <thead className="bg-[#1b4636] text-white text-sm sticky top-0 z-10">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>University</th>
              <th>Location</th>
              <th>Rank</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Subject</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {scholarships.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 transition-all border-b"
              >
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    className="w-16 h-12 object-cover rounded-md border"
                  />
                </td>
                <td className="font-semibold">{item.scholarshipName}</td>
                <td className="font-medium">{item.universityName}</td>
                <td>
                  {item.city}, {item.country}
                </td>
                <td className="font-semibold">{item.worldRank}</td>
                <td className="min-w-[132px]">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">
                    {item.scholarshipCategory}
                  </span>
                </td>
                <td>{item.degree}</td>
                <td>{item.subjectCategory}</td>
                <td className="text-red-600 font-semibold">
                  {new Date(item.deadline).toLocaleDateString()}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedScholar(item);
                      setShowUpdateModal(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile CARD VIEW */}
      <div className="lg:hidden md:block space-y-5">
        {scholarships.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <img
              src={item.image}
              className="w-full h-40 object-cover"
              alt={item.scholarshipName}
            />

            <div className="p-4 space-y-3">
              <h3 className="text-lg font-bold">{item.scholarshipName}</h3>

              <div className="flex items-center gap-2 text-gray-700">
                <FaUniversity /> {item.universityName}
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MdOutlineLocationOn />
                {item.city}, {item.country}
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <GiWorld /> Rank: {item.worldRank}
              </div>

              <div className="flex justify-between text-sm text-gray-700 pt-2">
                <p className="font-semibold">{item.degree}</p>
                <p>{item.subjectCategory}</p>
              </div>

              <p className="text-sm">
                Deadline:
                <span className="font-semibold text-red-600">
                  {" "}
                  {new Date(item.deadline).toLocaleDateString()}
                </span>
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedScholar(item);
                    setShowUpdateModal(true);
                  }}
                  className="w-1/2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-1/2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedScholar && (
        <UpdateScholarship
          selectedScholar={selectedScholar}
          setShowUpdateModal={setShowUpdateModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManageScholarships;
