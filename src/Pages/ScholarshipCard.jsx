import React from "react";
import { FaUniversity } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={scholarship.image || "https://via.placeholder.com/600x400"}
          alt={scholarship.scholarshipName}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Title Overlay */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-5">
          <h3 className="text-xl font-bold text-white drop-shadow line-clamp-2">
            {scholarship.scholarshipName}
          </h3>
        </div>
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#276B51] text-white px-3 py-1 rounded-lg text-sm font-semibold shadow">
          {scholarship.scholarshipCategory}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <FaUniversity className="text-[#1a3c30] mt-1" size={20} />
          <p className="text-gray-900 font-semibold text-lg leading-tight line-clamp-2">
            {scholarship.universityName}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <MdLocationOn size={16} className="text-blue-600" />
            {scholarship.city}, {scholarship.country}
          </div>
          <div className="flex items-center gap-1">
            <GiWorld size={16} className="text-green-700" />
            Rank: <span className="font-semibold">{scholarship.worldRank}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 uppercase text-[10px]">Degree</p>
            <p className="text-gray-800 font-medium text-sm">
              {scholarship.degree}
            </p>
          </div>
          <div>
            <p className="text-gray-400 uppercase text-[10px]">Subject</p>
            <p className="text-gray-800 font-medium text-sm">
              {scholarship.subjectCategory}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          ⏳
          <span className="text-red-600 font-semibold ml-1">
            {new Date(scholarship.deadline).toLocaleDateString()}
          </span>
        </div>

        <Link
          to={`/scholarshipdetails/${scholarship._id}`}
          className="block w-full py-2 bg-[#276B51] hover:bg-[#1a3c30] text-white font-semibold rounded-lg text-sm transition-all text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
