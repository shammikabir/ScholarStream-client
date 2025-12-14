// AddReviewModal.jsx
import React, { useState } from "react";
import axios from "axios";

const AddReviewModal = ({ application, onClose, onAddReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
        scholarshipId: application.scholarshipId,
        studentEmail: application.studentEmail,
        rating,
        comment,
      });
      onAddReview(res.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-11/12 md:w-1/2 relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Add Review</h2>

        <div className="space-y-4">
          <div>
            <label className="font-semibold">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={4}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
