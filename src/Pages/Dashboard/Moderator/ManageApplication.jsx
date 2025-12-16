// ManageApplications.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplicationDetails from "./ApplicationDetails";
import FeedbackModal from "./FeedbackModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`${import.meta.env.VITE_API_URL}/applications`)
      .then((res) => setApplications(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axiosSecure.put(
      `${import.meta.env.VITE_API_URL}/applications/status/${id}`,
      { status }
    );

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, applicationStatus: status } : app
      )
    );
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Applications</h2>

      {/* ===== Desktop & Tablet Table ===== */}
      <div className="hidden lg:block md:hidden overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead className="bg-[#1b4636] text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.studentName}</td>
                <td>{app.studentEmail}</td>
                <td>{app.universityName}</td>
                <td className="capitalize font-semibold">
                  {app.applicationStatus}
                </td>
                <td>{app.paymentStatus}</td>
                <td className="max-w-xs truncate">{app.feedback}</td>
                <td className="flex gap-1 ">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="btn btn-sm btn-outline"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => setFeedbackApp(app)}
                    className="btn btn-sm bg-[#276B51] text-white"
                  >
                    Feedback
                  </button>

                  <select
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                    className="select select-sm"
                    defaultValue=""
                  >
                    <option disabled value="">
                      Status
                    </option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Card View ===== */}
      <div className="lg:hidden md:block space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div>
              <p className="font-semibold">{app.studentName}</p>
              <p className="text-sm text-gray-500">{app.studentEmail}</p>
            </div>

            <div className="text-sm">
              <p>
                <span className="font-medium">University:</span>{" "}
                {app.universityName}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="capitalize">{app.applicationStatus}</span>
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {app.paymentStatus}
              </p>
              <p className="truncate">
                <span className="font-medium">Feedback:</span>{" "}
                {app.feedback || "—"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setSelectedApp(app)}
                className="btn btn-sm btn-outline w-full"
              >
                Details
              </button>

              <button
                onClick={() => setFeedbackApp(app)}
                className="btn btn-sm bg-[#276B51] text-white w-full"
              >
                Feedback
              </button>

              <select
                onChange={(e) => updateStatus(app._id, e.target.value)}
                className="select select-sm w-full"
                defaultValue=""
              >
                <option disabled value="">
                  Update Status
                </option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="rejected">Reject</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {selectedApp && (
        <ApplicationDetails
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}

      {feedbackApp && (
        <FeedbackModal
          application={feedbackApp}
          onClose={() => setFeedbackApp(null)}
        />
      )}
    </div>
  );
};

export default ManageApplications;
