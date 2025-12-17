import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { MdRateReview } from "react-icons/md";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ReviewSection = ({ user, scholarshipId, reviews, setReviews }) => {
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const axiosSecure = useAxiosSecure();

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Oops!", "Please login to add a review!", "warning");
      return;
    }
    if (!newReview.comment || newReview.rating === 0) {
      Swal.fire("Missing Info", "Rating & comment required!", "error");
      return;
    }

    try {
      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        {
          scholarshipId,
          ratingPoint: newReview.rating,
          reviewComment: newReview.comment,
          userName: user.displayName || "Anonymous",
          userImage: user.photoURL || "https://i.ibb.co/fxJ1Z0k/user.png",
        }
      );

      setReviews([res.data, ...reviews]);
      setNewReview({ rating: 0, comment: "" });

      Swal.fire("Done!", "Your review has been added!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="mt-40 max-w-6xl mx-auto px-4 ">
      {/* Title Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-3">
          <MdRateReview size={60} className="text-green-800" />
        </div>

        <h2 className="text-4xl font-extrabold text-[#1a3c30] tracking-wide">
          User Reviews & Experiences
        </h2>

        <div className="flex justify-center mt-4">
          {[1, 1, 1, 1, 1].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-2xl" />
          ))}
        </div>

        <p className="text-gray-500 mt-3 text-lg">
          Real feedback from verified students
        </p>
      </div>

      {/* Review Form */}
      {user && (
        <form
          onSubmit={handleSubmitReview}
          className="bg-black p-6 rounded-2xl shadow-xl text-white border border-gray-200 mb-12"
        >
          <h4 className="text-2xl font-semibold text-white text-center mb-4">
            Leave a Review
          </h4>

          {/* Rating (center aligned) */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`cursor-pointer hover:text-yellow-400 shadow-lg  ${
                  newReview.rating >= star ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setNewReview({ ...newReview, rating: star })}
              />
            ))}
          </div>

          <textarea
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#276B51] outline-none"
            rows={4}
            placeholder="Write your honest experience..."
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />

          <button className="w-full mt-4 bg-[#276B51] hover:bg-[#1a3c30] text-white font-semibold py-3 rounded-xl transition">
            Submit Review
          </button>
        </form>
      )}

      {/* Review List */}
      <div className="mb-20">
        {/* --- Section Title --- */}
        <div className="text-center mb-10 mt-20 ">
          <h2 className="text-4xl font-bold text-[#1a3c30] tracking-wide">
            What Our Users Say
          </h2>
          <p className="text-gray-500 mt-2">
            Real experiences from real learners ✨
          </p>
        </div>

        {/* --- Reviews --- */}
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center text-lg mb-10">
            No reviews yet. Be the first!
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border-2 rounded-xl shadow-sm  border-green-600 p-6 flex gap-5"
              >
                {/* User Image */}
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#1a3c30]/20"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-xl font-semibold text-[#1a3c30]">
                      {review.userName}
                    </h5>

                    {/* Rating */}
                    <div className="flex">
                      {[...Array(review.ratingPoint)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-2xl" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {review.reviewComment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
