import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { imageUpload } from "../../../Utility";
import { GiGraduateCap } from "react-icons/gi";
import { AuthContext } from "../../../Provider/AuthContext";

const AddScholarshipForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { loading, setloading } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      setloading(true);
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await imageUpload(imageFile);
      }

      const scholarshipData = {
        ...data,
        image: imageUrl, // now it will contain the URL
        postDate: new Date(),
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/scholarships`,
        scholarshipData
      );

      alert("Scholarship added successfully!");
      reset();
      setImagePreview("");
    } catch (error) {
      console.error(error);
      alert("Failed to add scholarship!");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-5 px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="w-full p-6 flex items-center justify-center gap-3 bg-linear-to-r from-[#1a3c30] via-[#276B51] to-[#2C6B58] shadow-lg">
          <GiGraduateCap size={32} className="text-yellow-300" />
          <h2 className="text-2xl font-bold text-white">Add New Scholarship</h2>
        </div>
        <hr className="border-3" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8">
          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">University Image</label>
            <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-gray-700 font-semibold hover:text-green-900"
              >
                Click or Drag to Upload
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-40 h-40 object-cover rounded-xl shadow-md border border-gray-300"
                />
              )}
            </div>
          </div>

          {/* Text Fields Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Scholarship Name
              </label>
              <input
                {...register("scholarshipName", { required: true })}
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                University Name
              </label>
              <input
                {...register("universityName", { required: true })}
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Country</label>
              <input
                {...register("country", { required: true })}
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">City</label>
              <input
                {...register("city", { required: true })}
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">World Rank</label>
              <input
                {...register("worldRank", { required: true })}
                type="number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Subject Category
              </label>
              <input
                {...register("subjectCategory", { required: true })}
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">
                Scholarship Category
              </label>
              <select
                {...register("scholarshipCategory", { required: true })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              >
                <option value="">Select Category</option>
                <option value="Full Fund">Full Fund</option>
                <option value="Partial Fund">Partial Fund</option>
                <option value="Self Fund">Self Fund</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Degree</label>
              <select
                {...register("degree", { required: true })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              >
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
                <option value="Masters">Phd</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Tuition Fees</label>
              <input
                {...register("tuitionFees")}
                type="number"
                placeholder="Optional"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">
                Application Fees
              </label>
              <input
                {...register("applicationFees", { required: true })}
                type="number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Service Charge</label>
              <input
                {...register("serviceCharge", { required: true })}
                type="number"
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Deadline</label>
            <input
              {...register("deadline", { required: true })}
              type="date"
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-green-500 outline-none shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 text-white font-bold rounded-xl bg-black hover:bg-[#1a3c30] shadow-lg transition-all text-xl"
          >
            {loading ? "Submitting..." : "Add Scholarship"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarshipForm;
