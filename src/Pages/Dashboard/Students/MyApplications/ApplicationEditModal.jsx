// // ApplicationEditModal.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const ApplicationEditModal = ({ application, onClose, onUpdate }) => {
//   const [subjectCategory, setSubjectCategory] = useState(
//     application.subjectCategory
//   );
//   const [applicationFees, setApplicationFees] = useState(application.fees);

//   const handleUpdate = async () => {
//     try {
//       const res = await axios.put(
//         `${import.meta.env.VITE_API_URL}/applications/${application._id}`,
//         { subjectCategory, applicationFees }
//       );
//       onUpdate(res.data);
//       onClose();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-11/12 md:w-1/2 relative shadow-lg">
//         <button
//           className="absolute top-4 right-4 text-2xl font-bold"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         <h2 className="text-2xl font-bold mb-4">Edit Application</h2>

//         <div className="space-y-4">
//           <div>
//             <label className="font-semibold">Subject Category</label>
//             <input
//               type="text"
//               value={subjectCategory}
//               onChange={(e) => setSubjectCategory(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Application Fees</label>
//             <input
//               type="number"
//               value={applicationFees}
//               onChange={(e) => setApplicationFees(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>

//           <button
//             onClick={handleUpdate}
//             className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationEditModal;
