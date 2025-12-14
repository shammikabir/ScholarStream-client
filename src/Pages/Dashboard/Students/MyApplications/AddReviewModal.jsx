// AddReviewModal.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const AddReviewModal = ({ application, onClose, onAddReview }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const renderStarsText = (count) => "⭐".repeat(count);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Comment required",
        text: "Please write a comment before submitting",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
        scholarshipId: application.scholarshipId,
        studentEmail: application.studentEmail,
        scholarshipName: application.scholarshipName,
        universityName: application.universityName,
        rating,
        comment,
        createdAt: new Date(),
      });

      Swal.fire({
        icon: "success",
        title: "Review Added 🎉",
        html: `
          <p class="mb-2">Thanks for sharing your experience!</p>
          <div style="font-size:26px;">${renderStarsText(rating)}</div>
        `,
        timer: 2200,
        showConfirmButton: false,
      });

      onAddReview(res.data);
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong while adding review",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#276B51] to-[#1a3c30]">
          <h2 className="text-xl font-bold text-white">Add Your Review</h2>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:scale-110 transition"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Star Rating */}
          <div className="text-center">
            <p className="font-semibold mb-2">Your Rating</p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={28}
                    className={`cursor-pointer transition ${
                      starValue <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                );
              })}
            </div>
            <p className="text-sm text-gray-500 mt-1">{rating} out of 5</p>
          </div>

          {/* Comment */}
          <div>
            <label className="font-semibold block mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Share your experience..."
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#276B51] hover:bg-[#1a3c30] hover:scale-[1.02]"
              }`}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
