import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUniversity } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GiWorld, GiGraduateCap } from "react-icons/gi";
import { Link } from "react-router";
import Loading from "../Shared/Loading";

const fetchScholarships = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/allscholarships`
  );
  return data;
};

const AllScholarship = () => {
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: fetchScholarships,
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        Loading scholarships...<Loading></Loading>
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      {/* Page Header */}
      <div className="text-3xl  py-8 font-bold text-center text-black flex justify-center gap-4 shadow-lg">
        <GiGraduateCap size={40} className="text-green-800" />
        <h2>Available Scholarships</h2>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-12 md:px-20 px-5 pb-16">
        {scholarships.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={item.image || "https://via.placeholder.com/600x400"}
                alt={item.scholarshipName}
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Title Overlay */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-5">
                <h3 className="text-xl font-bold text-white drop-shadow line-clamp-2">
                  {item.scholarshipName}
                </h3>
              </div>

              {/* Category Badge */}
              <span className="absolute top-3 left-3 bg-[#276B51] text-white px-3 py-1 rounded-lg text-sm font-semibold shadow">
                {item.scholarshipCategory}
              </span>
            </div>

            {/* Content Area */}
            <div className="p-5 space-y-5">
              {/* University */}
              <div className="flex items-start gap-3">
                <FaUniversity className="text-[#1a3c30] mt-1" size={20} />
                <p className="text-gray-900 font-semibold text-lg leading-tight line-clamp-2">
                  {item.universityName}
                </p>
              </div>

              <hr className="border-gray-300" />

              {/* Location + Rank */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MdLocationOn className="text-blue-600" size={18} />
                  <p className="text-gray-700 text-xs">
                    {item.city}, {item.country}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <GiWorld className="text-green-700" size={18} />
                  <p className="text-gray-700 text-xs">
                    Rank:{" "}
                    <span className="font-semibold">{item.worldRank}</span>
                  </p>
                </div>
              </div>

              <hr className="border-gray-300" />

              {/* Degree & Subject */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase">Degree</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {item.degree}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-[10px] uppercase">Subject</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {item.subjectCategory}
                  </p>
                </div>
              </div>

              <hr className="border-gray-300" />

              {/* Deadline */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-gray-200 flex items-center justify-center">
                  ⏳
                </div>
                <p className="text-gray-800 text-sm">
                  Deadline:
                  <span className="font-semibold text-red-600 ml-1">
                    {new Date(item.deadline).toLocaleDateString()}
                  </span>
                </p>
              </div>

              {/* Button */}
              <Link
                to={`/scholarshipdetails/${item._id}`}
                className="block w-full py-2 bg-[#276B51] hover:bg-[#1a3c30]  text-white font-semibold rounded-lg text-sm transition-all  text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
