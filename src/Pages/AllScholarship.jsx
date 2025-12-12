import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUniversity } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { GiGraduateCap } from "react-icons/gi";
import { Link } from "react-router";

const fetchScholarships = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/allscholarships`
  );
  // console.log("Fetched Scholarships:", data);
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
        Loading scholarships...
      </div>
    );
  }

  return (
    <div className="   bg-gray-100 min-h-screen">
      <div className="text-3xl bg-linear-to-r from-[#1a3c30] via-[#276B51] to-[#2C6B58] py-8 font-bold text-center  mt-0 text-white flex justify-center gap-4">
        <GiGraduateCap size={38} className="text-yellow-300" />
        <h2>Available Scholarships</h2>
      </div>

      <hr className="border-3" />

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 mt-15 md:px-26 px-4">
        {scholarships.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200  "
          >
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.scholarshipName}
                className="w-full h-38 object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Title Overlay */}
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/70 to-transparent p-5">
                <h3 className="text-2xl font-bold text-white drop-shadow">
                  {item.scholarshipName}
                </h3>
              </div>

              {/* Category Badge */}
              <span className="absolute top-3 left-3 bg-green-700 text-white px-2.5 py-1 rounded-lg text-sm font-semibold shadow">
                {item.scholarshipCategory}
              </span>
            </div>

            {/* Content */}
            <div className="p-3 space-y-4">
              {/* University */}
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                  <FaUniversity className="text-purple-700" size={17} />
                </div>
                <p className="text-gray-900 font-semibold text-lg">
                  {item.universityName}
                </p>
              </div>

              <hr className="border-gray-300" />

              {/* Location + Rank */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                    <MdLocationOn className="text-blue-600" size={17} />
                  </div>
                  <p className="text-gray-700 text-xs">
                    {item.city}, {item.country}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                    <GiWorld className="text-green-700" size={16} />
                  </div>
                  <p className="text-gray-700 text-xs">
                    Rank:{" "}
                    <span className="font-semibold text-gray-900">
                      {item.worldRank}
                    </span>
                  </p>
                </div>
              </div>

              <hr className="border-gray-300" />

              {/* Degree & Subject */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-wide">
                    Degree
                  </p>
                  <p className="text-gray-800 text-sm font-medium">
                    {item.degree}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-wide">
                    Subject
                  </p>
                  <p className="text-gray-800 text-sm font-medium">
                    {item.subjectCategory}
                  </p>
                </div>
              </div>

              <hr className="border-gray-300" />

              {/* Deadline */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
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
                className="block w-full py-2 bg-black text-white font-semibold
                rounded-lg text-sm transition-all mb-3 hover:bg-green-700
                text-center"
              >
                {" "}
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
