import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditReviewModal = ({ review, onClose, onUpdate }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!comment.trim()) {
      Swal.fire("Warning", "Comment cannot be empty", "warning");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/reviews/${review._id}`,
        { rating, comment }
      );

      Swal.fire("Updated!", "Review updated successfully 🎉", "success");
      onUpdate(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to update review", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-11/12 md:w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500"
        >
          &times;
        </button>

        <h3 className="text-2xl font-bold mb-4 text-center">Edit Review</h3>

        <div className="space-y-4">
          <div>
            <label className="font-semibold">Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full py-3 rounded text-white font-semibold
              ${loading ? "bg-gray-400" : "bg-green-700 hover:bg-green-800"}`}
          >
            {loading ? "Updating..." : "Update Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
