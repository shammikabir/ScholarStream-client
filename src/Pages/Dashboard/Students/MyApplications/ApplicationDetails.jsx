// ApplicationDetails.jsx
import React from "react";

const ApplicationDetails = ({ application, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-11/12 md:w-2/3 relative shadow-lg">
        <button
          className="absolute top-4 right-4 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Application Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <div>
            <span className="font-semibold">Scholarship Name:</span>{" "}
            {application.scholarshipName}
          </div>
          <div>
            <span className="font-semibold">University Name:</span>{" "}
            {application.universityName}
          </div>
          <div>
            <span className="font-semibold">University Address:</span>{" "}
            {application.universityAddress}
          </div>
          <div>
            <span className="font-semibold">Subject Category:</span>{" "}
            {application.subjectCategory}
          </div>
          <div>
            <span className="font-semibold">Application Fees:</span> $
            {application.fees}
          </div>
          <div>
            <span className="font-semibold">Application Status:</span>{" "}
            {application.applicationStatus}
          </div>
          <div>
            <span className="font-semibold">Payment Status:</span>{" "}
            {application.paymentStatus}
          </div>
          <div>
            <span className="font-semibold">Student Name:</span>{" "}
            {application.studentName}
          </div>
          <div>
            <span className="font-semibold">Student Email:</span>{" "}
            {application.studentEmail}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
