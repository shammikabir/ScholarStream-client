import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
// import axios from "axios";
import { TbListDetails } from "react-icons/tb";
import { AuthContext } from "../Provider/AuthContext";
import ReviewSection from "./Reviewsection";
import Loading from "../Shared/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading, setloading } = useContext(AuthContext);
  const [isApplied, setIsApplied] = useState(false);
  const axiosSecure = useAxiosSecure();

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scholarshipRes = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/scholarships/${id}`
        );
        setScholarship(scholarshipRes.data);

        const reviewsRes = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/reviews/${id}`
        );
        setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);

        // ✅ already applied check
        if (user?.email) {
          const checkRes = await axiosSecure.get(
            `${import.meta.env.VITE_API_URL}/applications/check`,
            {
              params: {
                scholarshipId: id,
                email: user.email,
              },
            }
          );
          setIsApplied(checkRes.data.applied);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };

    fetchData();
  }, [id, user]);

  if (loading) return <Loading></Loading>;
  if (!scholarship)
    return (
      <p className="text-center mt-10 text-red-500">Scholarship not found!</p>
    );
  const handleApply = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login required",
        text: "Please login to apply for this scholarship",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to apply for this scholarship",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#276B51",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Apply",
    });

    if (!result.isConfirmed) return;

    const applicationData = {
      scholarshipId: scholarship._id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      universityAddress: `${scholarship.city}, ${scholarship.country}`,
      subjectCategory: scholarship.scholarshipCategory,
      fees:
        Number(scholarship.applicationFees || 0) +
        Number(scholarship.serviceCharge || 0),

      studentName: user.displayName,
      studentEmail: user.email,
    };

    try {
      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/applications`,
        applicationData
      );

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Proceed to payment",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(`/checkout/${scholarship._id}`, {
          state: { scholarship },
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong",
      });
    }
  };

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
            {/* Apply Button */}
            <button
              onClick={handleApply}
              disabled={isApplied}
              className={`self-start px-10 py-4 text-xl font-bold rounded-lg shadow-lg transition duration-300
    ${
      isApplied
        ? "bg-gray-200 border-gray-600 border cursor-not-allowed"
        : "bg-[#276B51] hover:bg-[#1a3c30] text-white"
    }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
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
