import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { imageUpload } from "../../../../Utility";

const UpdateScholarship = ({
  selectedScholar,
  setShowUpdateModal,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    image: "",
    scholarshipName: "",
    universityName: "",
    city: "",
    country: "",
    worldRank: "",
    scholarshipCategory: "",
    degree: "",
    subjectCategory: "",
    deadline: "",
  });
  const [imageFile, setImageFile] = useState(null); // for file input
  const [uploading, setUploading] = useState(false); // loading state

  useEffect(() => {
    if (selectedScholar) setFormData(selectedScholar);
  }, [selectedScholar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image; // default to existing image
      if (imageFile) {
        setUploading(true);
        imageUrl = await imageUpload(imageFile); // upload and get URL
        setUploading(false);
      }

      const { _id, ...updateData } = formData; // remove _id
      updateData.image = imageUrl; // set uploaded image URL

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/scholarships/${_id}`,
        updateData
      );

      if (data.success) {
        toast.success("Scholarship Updated Successfully!");
        onUpdate({ _id, ...updateData }); // update parent state
        setShowUpdateModal(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-11/12 md:w-1/2 rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setShowUpdateModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Update Scholarship
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Scholarship Name and University */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold">Scholarship Name</label>
              <input
                type="text"
                name="scholarshipName"
                value={formData.scholarshipName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="font-semibold">University Name</label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* City, Country, World Rank */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold">World Rank</label>
              <input
                type="number"
                name="worldRank"
                value={formData.worldRank}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Category, Degree, Subject */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="font-semibold">Category</label>
              <input
                type="text"
                name="scholarshipCategory"
                value={formData.scholarshipCategory}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Degree</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Subject Category</label>
              <input
                type="text"
                name="subjectCategory"
                value={formData.subjectCategory}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Deadline and Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline?.split("T")[0]}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="input w-full"
              />
              {formData.image && !imageFile && (
                <img
                  src={formData.image}
                  alt="Scholarship"
                  className="w-32 h-20 object-cover mt-2 rounded-md"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 bg-[#146c43] hover:bg-[#0f4e32] text-white font-bold text-lg rounded-xl shadow-lg mt-4 transition-all disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Update Scholarship"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarship;
