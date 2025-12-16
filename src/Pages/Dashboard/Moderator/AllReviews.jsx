// AllReviews.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews`)
      .then((res) => setReviews(res.data));
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));

      Swal.fire("Deleted!", "Review has been removed.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to delete review", "error");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#1b4636]">All Reviews</h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block md:hidden overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-[#1b4636] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Scholarship</th>
              <th className="px-4 py-3 text-left">University</th>
              <th className="px-4 py-3 text-left">Student Email</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Comment</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className=" hover:bg-gray-50 transition">
                <td className="px-4 py-3">{review.scholarshipName}</td>
                <td className="px-4 py-3">{review.universityName}</td>
                <td className="px-4 py-3">{review.studentEmail}</td>
                <td className="px-4 py-3">{"⭐".repeat(review.rating)}</td>
                <td
                  className="px-4 py-3 max-w-xs truncate"
                  title={review.comment}
                >
                  {review.comment}
                </td>
                <td className="px-4 py-3">
                  {new Date(review.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {reviews.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="lg:hidden md:block space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-2xl shadow p-4 space-y-2"
          >
            <h3 className="font-bold text-lg text-[#1b4636]">
              {review.scholarshipName}
            </h3>

            <p className="text-sm text-gray-600">{review.universityName}</p>

            <p className="text-sm">
              <span className="font-semibold">Email:</span>{" "}
              {review.studentEmail}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Rating:</span>{" "}
              {"⭐".repeat(review.rating)}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Comment:</span> {review.comment}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={() => handleDelete(review._id)}
              className="w-full mt-2 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Delete Review
            </button>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews found</p>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
