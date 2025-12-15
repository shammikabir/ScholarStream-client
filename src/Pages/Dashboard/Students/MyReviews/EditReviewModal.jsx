// EditReviewModal.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const EditReviewModal = ({ review, onClose, onUpdate }) => {
  const [rating, setRating] = useState(review.rating);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(review.comment);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Comment required",
        text: "Please write a comment before updating",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/reviews/${review._id}`,
        { rating: Number(rating), comment }
      );

      Swal.fire({
        icon: "success",
        title: "Review Updated Successfully 🎉",
        html: `<p class="mb-2">Your feedback has been updated!</p>
               <div style="font-size:24px;">${"⭐".repeat(rating)}</div>`,
        timer: 2200,
        showConfirmButton: false,
      });

      onUpdate(res.data);
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong while updating review",
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
          <h2 className="text-xl font-bold text-white">Edit Your Review</h2>
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
              placeholder="Update your experience..."
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#276B51] hover:bg-[#1a3c30] hover:scale-[1.02]"
              }`}
          >
            {loading ? "Updating..." : "Update Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
