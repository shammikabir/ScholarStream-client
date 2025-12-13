import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { TbListDetails } from "react-icons/tb";
import { AuthContext } from "../Provider/AuthContext";
import ReviewSection from "./Reviewsection";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scholarshipRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/scholarships/${id}`
        );
        setScholarship(scholarshipRes.data);

        const reviewsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/${id}`
        );
        setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!scholarship)
    return (
      <p className="text-center mt-10 text-red-500">Scholarship not found!</p>
    );

  return (
    <div>
      {/* Page Header */}
      <div className="text-3xl  py-8 font-bold text-center text-black flex justify-center gap-4 shadow-lg  ">
        <TbListDetails size={40} className="text-green-700" />
        <h2>Scholarship Details</h2>
      </div>

      {/* Scholarship Info Card */}
      <div className="max-w-7xl mx-auto mt-24 px-6 relative">
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Image */}
          <div className="md:w-1/2 relative">
            <img
              src={scholarship.image}
              alt={scholarship.universityName}
              className="w-full h-96 md:h-full object-cover "
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h1 className="text-5xl font-extrabold text-[#1a3c30] mb-3">
                {scholarship.scholarshipName}
              </h1>
              <p className="text-xl text-gray-600 italic mb-6">
                {scholarship.universityName} - {scholarship.city},{" "}
                {scholarship.country}
              </p>

              {/* Description */}
              <p className="text-black mb-8 leading-relaxed text-lg">
                This prestigious scholarship supports outstanding students
                pursuing higher education abroad. Applicants receive tuition
                support, reduced fees, and guidance throughout the process.
                Don't miss the opportunity to apply!
              </p>

              {/* Key Info Inline */}
              <div className="flex flex-wrap gap-6 mb-8  text-lg">
                <div>
                  <span className="font-extrabold">Degree:</span>{" "}
                  {scholarship.degree}
                </div>
                <div>
                  <span className="font-extrabold">Category:</span>{" "}
                  {scholarship.scholarshipCategory}
                </div>
                <div>
                  <span className="font-extrabold">Tuition:</span> $
                  {scholarship.tuitionFees}
                </div>
                <div>
                  <span className="font-extrabold">Application Fee:</span> $
                  {scholarship.applicationFees}
                </div>
                <div>
                  <span className="font-extrabold">Service Charge:</span> $
                  {scholarship.serviceCharge}
                </div>
                <div>
                  <span className="font-extrabold">World Rank:</span>{" "}
                  {scholarship.worldRank}
                </div>
                <div>
                  <span className="font-semibold text-red-500">Deadline:</span>{" "}
                  {new Date(scholarship.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => navigate(`/checkout/${id}`)}
              className="self-start px-10 py-4 bg-[#276B51] hover:bg-[#1a3c30] text-white text-xl font-bold rounded-lg shadow-lg transition duration-300"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section Component */}
      <ReviewSection
        user={user}
        scholarshipId={id}
        reviews={reviews}
        setReviews={setReviews}
      />
    </div>
  );
};

export default ScholarshipDetails;
