import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditReviewModal from "./EditReviewModal";
import { AuthContext } from "../../../../Provider/AuthContext";
import Loading from "../../../../Shared/Loading";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  const { user, loading, setloading } = useContext(AuthContext);

  // 🔹 fetch my reviews
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/my-reviews/${user.email}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // 🔹 delete review
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id));

      Swal.fire("Deleted!", "Your review has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to delete review", "error");
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t written any reviews yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl ">
          <table className="table w-full">
            <thead className="bg-[#1b4636] text-white text-lg">
              <tr>
                <th>#</th>
                <th>Scholarship</th>
                <th>University</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review, index) => (
                <tr key={review._id} className="hover text-lg">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{review.scholarshipName}</td>
                  <td>{review.universityName}</td>
                  <td className="max-w-xs truncate">{review.comment}</td>
                  <td>{"⭐".repeat(review.rating)}</td>
                  <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-lg hover:bg-blue-700 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="px-3 py-1 rounded bg-red-100 text-red-600 text-lg hover:bg-red-700 hover:text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {selectedReview && (
        <EditReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
          onUpdate={(updatedReview) => {
            setReviews(
              reviews.map((r) =>
                r._id === updatedReview._id ? updatedReview : r
              )
            );
            setSelectedReview(null);
          }}
        />
      )}
    </div>
  );
};

export default MyReviews;
