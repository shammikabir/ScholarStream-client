import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { AuthContext } from "../../../../Provider/AuthContext";
import Loading from "../../../../Shared/Loading";
import ApplicationDetails from "./ApplicationDetails";
// import ApplicationEditModal from "./ApplicationEditModal";
import AddReviewModal from "./AddReviewModal";

const MyApplication = () => {
  const { user, loading, setloading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  // Modals
  const [selectedAppDetails, setSelectedAppDetails] = useState(null);
  // const [selectedAppEdit, setSelectedAppEdit] = useState(null);
  const [selectedAppReview, setSelectedAppReview] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/applications/${user.email}`
        );
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    };
    fetchApplications();
  }, [user, setloading]);

  if (loading) return <Loading />;

  // Delete function
  const handleDelete = async (appId) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/applications/${appId}`
      );
      setApplications(applications.filter((app) => app._id !== appId));
    } catch (error) {
      console.error(error);
    }
  };

  // Update function for Edit modal
  const handleUpdate = (updatedApp) => {
    setApplications(
      applications.map((app) => (app._id === updatedApp._id ? updatedApp : app))
    );
  };

  // Add review function for Review modal
  const handleAddReview = (newReview) => {
    setApplications(
      applications.map((app) =>
        app._id === newReview.applicationId
          ? { ...app, applicationStatus: "reviewed" }
          : app
      )
    );
  };

  return (
    <div className="p-2 md:p-0 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">My Applications</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-xl rounded-xl border border-gray-200">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-[#1b4636] text-white text-[17px] sticky top-0 z-10">
            <tr>
              <th className="p-3 text-center">#</th>
              <th className="p-3 text-left">University</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Fees</th>
              <th className="text-left w-[140px]">Application Status</th>
              <th className="text-center w-[150px]">Payment Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[17px] divide-y divide-gray-200">
            {applications.map((app, index) => (
              <tr key={app._id} className="hover:bg-gray-50 transition">
                <td className="p-3">{index + 1}</td>
                <td className=" px-2 font-semibold">{app.universityName}</td>
                <td className="px-2">{app.universityAddress}</td>
                <td>
                  <span className="px-2 py-1 text-green-700 rounded-md text-[17px] font-semibold">
                    {app.subjectCategory}
                  </span>
                </td>
                <td className="px-7">${app.fees}</td>
                <td className="w-[120px] text-center text-red-600">
                  {app.applicationStatus}
                </td>
                <td className=" text-center">{app.paymentStatus}</td>
                <td className=" flex flex-wrap gap-2">
                  {/* Details */}
                  <button
                    className="px-3 py-1 my-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition"
                    onClick={() => setSelectedAppDetails(app)}
                  >
                    Details
                  </button>

                  {/* Edit */}
                  {app.applicationStatus === "pending" && (
                    <button
                      className="px-3 py-1 my-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-600 hover:text-white transition"
                      onClick={() => setSelectedAppEdit(app)}
                    >
                      Edit
                    </button>
                  )}

                  {/* Delete */}
                  {app.applicationStatus === "pending" && (
                    <button
                      className="px-3 py-1 my-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-600 hover:text-white transition"
                      onClick={() => handleDelete(app._id)}
                    >
                      Delete
                    </button>
                  )}

                  {/* Pay */}
                  {app.applicationStatus === "pending" &&
                    app.paymentStatus === "unpaid" && (
                      <button
                        className="px-4 py-1 my-3 mr-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-700 hover:text-white transition"
                        onClick={() =>
                          navigate(`/checkout/${app.scholarshipId}`, {
                            state: { scholarshipId: app.scholarshipId },
                          })
                        }
                      >
                        Pay
                      </button>
                    )}

                  {/* Add Review */}
                  {app.applicationStatus === "completed" && (
                    <button
                      className=" bg-green-100 my-3 mx-5 px-2 text-green-700 rounded-lg hover:bg-green-700 hover:text-white transition"
                      onClick={() => setSelectedAppReview(app)}
                    >
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-5">
        {applications.map((app, index) => (
          <div
            key={app._id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-bold">{app.universityName}</h3>
              <p className="text-gray-600">{app.universityAddress}</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md font-semibold">
                {app.subjectCategory}
              </span>
              <p className="text-gray-700 font-medium">Fees: ${app.fees}</p>

              <div className="flex gap-2 flex-wrap pt-2">
                <button
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setSelectedAppDetails(app)}
                >
                  Details
                </button>

                {app.applicationStatus === "pending" && (
                  <>
                    <button
                      className="flex-1 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      onClick={() => setSelectedAppEdit(app)}
                    >
                      Edit
                    </button>
                    <button
                      className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      onClick={() => handleDelete(app._id)}
                    >
                      Delete
                    </button>
                  </>
                )}

                {app.applicationStatus === "pending" &&
                  app.paymentStatus === "unpaid" && (
                    <button
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      onClick={() =>
                        navigate(`/checkout/${app.scholarshipId}`, {
                          state: { scholarshipId: app.scholarshipId },
                        })
                      }
                    >
                      Pay
                    </button>
                  )}

                {app.applicationStatus === "completed" && (
                  <button
                    className="flex-1  bg-green-700 text-white rounded-lg hover:bg-purple-700 transition"
                    onClick={() => setSelectedAppReview(app)}
                  >
                    Add Review
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedAppDetails && (
        <ApplicationDetails
          application={selectedAppDetails}
          onClose={() => setSelectedAppDetails(null)}
        />
      )}

      {/* {selectedAppEdit && (
        <ApplicationEditModal
          application={selectedAppEdit}
          onClose={() => setSelectedAppEdit(null)}
          onUpdate={handleUpdate}
        />
      )} */}

      {selectedAppReview && (
        <AddReviewModal
          application={selectedAppReview}
          onClose={() => setSelectedAppReview(null)}
          onAddReview={handleAddReview}
        />
      )}
    </div>
  );
};

export default MyApplication;
