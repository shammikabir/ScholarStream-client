// ApplicationDetails.jsx
import React from "react";
import {
  FaUniversity,
  FaUserGraduate,
  FaMoneyBillWave,
  FaEnvelope,
} from "react-icons/fa";

const ApplicationDetails = ({ application, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b bg-gradient-to-r from-[#276B51] to-[#1a3c30]">
          <h2 className="text-2xl font-bold text-white">Application Details</h2>
          <button
            onClick={onClose}
            className="text-white text-3xl font-bold hover:scale-110 transition"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-[16px]">
          {/* Scholarship */}
          <DetailItem
            icon={<FaUniversity />}
            label="Scholarship Name"
            value={application.scholarshipName}
          />

          <DetailItem
            icon={<FaUniversity />}
            label="University Name"
            value={application.universityName}
          />

          <DetailItem
            icon={<FaUniversity />}
            label="University Address"
            value={application.universityAddress}
          />

          <DetailItem
            icon={<FaUserGraduate />}
            label="Subject Category"
            value={application.subjectCategory}
          />

          <DetailItem
            icon={<FaMoneyBillWave />}
            label="Application Fees"
            value={`$${application.fees}`}
          />

          {/* Status */}
          <div>
            <p className="font-semibold mb-1">Application Status</p>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold
                ${
                  application.applicationStatus === "approved"
                    ? "bg-green-100 text-green-700"
                    : application.applicationStatus === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {application.applicationStatus}
            </span>
          </div>

          <div>
            <p className="font-semibold mb-1">Payment Status</p>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold
                ${
                  application.paymentStatus === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {application.paymentStatus}
            </span>
          </div>

          {/* Student */}
          <DetailItem
            icon={<FaUserGraduate />}
            label="Student Name"
            value={application.studentName}
          />

          <DetailItem
            icon={<FaEnvelope />}
            label="Student Email"
            value={application.studentEmail}
          />
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-[#276B51] text-white font-semibold hover:bg-[#1a3c30] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex gap-3 items-start">
    <div className="text-[#276B51] text-xl mt-1">{icon}</div>
    <div>
      <p className="font-semibold text-gray-700">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export default ApplicationDetails;
