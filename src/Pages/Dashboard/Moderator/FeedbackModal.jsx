// FeedbackModal.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const FeedbackModal = ({ application, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      Swal.fire("Warning", "Feedback cannot be empty", "warning");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `${import.meta.env.VITE_API_URL}/applications/feedback/${
          application._id
        }`,
        { feedback }
      );

      Swal.fire("Success", "Feedback submitted 🎉", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error", "Failed to submit feedback", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#276B51] to-[#1a3c30] flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Application Feedback</h3>
          <button onClick={onClose} className="text-white text-3xl">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="font-semibold text-gray-700">
            Student: {application.studentName}
          </p>

          <textarea
            rows={5}
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-600"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold
              ${loading ? "bg-gray-400" : "bg-[#276B51] hover:bg-[#1a3c30]"}`}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
