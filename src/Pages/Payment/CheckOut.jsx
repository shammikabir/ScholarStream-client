import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(
    location.state?.scholarship || null
  );
  const [loading, setLoading] = useState(!scholarship);

  // If user directly opens URL, fetch scholarship by ID
  useEffect(() => {
    if (!scholarship) {
      const fetchScholarship = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/scholarships/${id}`
          );
          setScholarship(res.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchScholarship();
    }
  }, [id, scholarship]);

  const handlePayNow = async () => {
    try {
      if (!scholarship) return;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        {
          title: scholarship.scholarshipName,
          price:
            Number(scholarship.applicationFees || 0) +
            Number(scholarship.serviceCharge || 0),
        }
      );

      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      alert("Payment failed!");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!scholarship)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl mb-4">
          Scholarship data not found! Please go back and select a scholarship.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#276B51] text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-5">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-white">
        {/* LEFT – SUMMARY */}
        <div className="relative p-10 text-white bg-linear-to-br from-[#0f3d2e] via-[#1f6f54] to-[#2a8c6a]">
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-18 tracking-wide">
              Checkout Summary
            </h2>

            <div className="space-y-5 text-lg">
              <div>
                <p className="text-white/70 text-sm">Scholarship</p>
                <p className="font-semibold">{scholarship.scholarshipName}</p>
              </div>

              <div>
                <p className="text-white/70 text-sm">University</p>
                <p className="font-semibold">{scholarship.universityName}</p>
              </div>

              <div className="flex justify-between border-b border-white/20 pb-3">
                <span className="text-white/80">Application Fee</span>
                <span>${scholarship.applicationFees}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/80">Service Charge</span>
                <span>${scholarship.serviceCharge}</span>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-white/15 backdrop-blur-md flex justify-between items-center">
                <span className="text-lg font-medium">Total Payable</span>
                <span className="text-2xl font-bold">
                  $
                  {Number(scholarship.applicationFees) +
                    Number(scholarship.serviceCharge)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT – PAYMENT */}
        <div className="p-10 flex flex-col justify-center items-center text-center bg-white">
          <div className="w-full max-w-sm">
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Secure Checkout
            </h3>

            <p className="text-gray-500 mb-8 text-sm">
              Payments are encrypted and securely processed by Stripe.
            </p>

            <button
              onClick={handlePayNow}
              className="w-full py-4 rounded-2xl text-xl font-semibold text-white
              bg-[#276B51] hover:bg-[#1a3c30] "
            >
              Pay Now
            </button>

            <div className="flex items-center justify-center gap-2 mt-5 text-gray-400 text-sm">
              <FaLock className="text-green-600" />
              <span>SSL Secured • Powered by Stripe</span>
            </div>

            <div className="mt-8 text-xs text-gray-400">
              By proceeding, you agree to our secure payment terms.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
