import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scholarshipRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/scholarships/${id}`
        );

        setScholarship(scholarshipRes.data || null);

        const reviewsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/${id}`
        );

        setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please login to add review");
    if (!newReview.comment || newReview.rating === 0) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
        scholarshipId: id,
        ratingPoint: newReview.rating,
        reviewComment: newReview.comment,
        userName: user.displayName || "Anonymous",
        userImage: user.photoURL || "https://i.ibb.co/fxJ1Z0k/user.png",
      });

      setReviews([res.data, ...reviews]);
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!scholarship)
    return (
      <p className="text-center mt-10 text-red-500">Scholarship not found!</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className="w-full md:w-1/3 h-64 object-cover rounded-lg"
        />

        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-orange-500">
            {scholarship.scholarshipName}
          </h2>
          <p className="text-gray-300 mt-2">{scholarship.universityName}</p>
          <p className="text-gray-300 mt-4">{scholarship.subjectCategory}</p>

          <button
            onClick={() => navigate(`/checkout/${id}`)}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-100 mb-4">Reviews</h3>

        {user && (
          <form
            onSubmit={handleSubmitReview}
            className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2 mb-6"
          >
            <label className="text-gray-300">Your Rating:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer ${
                    newReview.rating >= star
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>

            <textarea
              className="p-2 bg-gray-700 rounded text-white"
              rows={3}
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            ></textarea>

            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              Submit Review
            </button>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-gray-900 p-4 rounded-lg mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={review.userImage}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-gray-200 font-semibold">
                    {review.userName}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mt-2">{review.reviewComment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
