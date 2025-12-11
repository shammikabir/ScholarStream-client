import React, { useContext, useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { Mail, Phone, Edit3 } from "lucide-react";

import axios from "axios";

import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthContext";
import { imageUpload } from "../../Utility";
import useRole from "../../Hooks/useRole";

const MyProfile = () => {
  const { user, setuser } = useContext(AuthContext);
  const [role] = useRole();
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  // Image change handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      // 1️⃣ Upload to imgbb
      const imgURL = await imageUpload(file);

      // 2️⃣ Update Firebase Profile
      await user.updateProfile({ photoURL: imgURL });

      // 3️⃣ Update MongoDB
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/update-photo/${user.email}`,
        {
          photo: imgURL,
        }
      );

      // Update local state
      setuser({ ...user, photoURL: imgURL });

      toast.success("Profile picture updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile image");
    } finally {
      setLoading(false);
    }
  };
  //  <img
  //           src="https://images.unsplash.com/photo-1527549993586-dff825b37782"
  //           alt="banner"
  //           className="w-full h-full object-cover"
  //         />

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-5 px-10">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl">
        {/* Cover Image */}
        <div className="h-30 w-full overflow-hidden rounded-t-3xl">
          <img
            src="https://images.unsplash.com/photo-1527549993586-dff825b37782"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center -mt-20 px-8 pb-10">
          {/* Profile Image */}
          <img
            src={user?.photoURL || "https://i.ibb.co/FDZ3hGJ/default-user.png"}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />

          {/* Role */}
          <p className="mt-3 px-5 py-1 text-sm bg-green-700 text-white rounded-full shadow">
            {role}
          </p>

          {/* User ID */}
          <p className="mt-2 text-gray-700 font-medium text-sm">
            User ID: {user?.uid}
          </p>

          {/* Bio Section */}
          <div className="mt-5 w-full bg-gray-50 rounded-2xl p-6 shadow-md flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 font-semibold text-lg flex items-center gap-2">
                About Me
              </h3>
              <button className="text-gray-500 hover:text-gray-800 flex items-center gap-1">
                <Edit3 size={16} /> Edit
              </button>
            </div>
            <p className="text-gray-700 text-sm">
              Passionate UI/UX designer who loves creating beautiful and
              user-friendly digital experiences. Always learning and exploring
              new design trends.
            </p>
          </div>

          {/* Email & Phone */}
          <div className="mt-5 w-full flex flex-col md:flex-row justify-between items-center bg-gray-50 rounded-2xl p-5 gap-6 shadow-md">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-green-800 text-sm flex items-center gap-1">
                <Mail size={16} /> Email
              </span>
              <span className="font-bold text-gray-800">{user?.email}</span>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <span className="text-green-800 text-sm flex items-center gap-1">
                <Phone size={16} /> Phone
              </span>
              <span className="font-bold text-gray-800">+880 1234 567890</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button className="bg-black hover:bg-[#146c43] text-white px-6 py-2 rounded-xl shadow-lg transition-all">
              Update Profile
            </button>
            <button className="bg-black hover:bg-[#146c43] text-white px-6 py-2 rounded-xl shadow-lg transition-all">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
