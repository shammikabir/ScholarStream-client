import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Shared/Loading";
import { AuthContext } from "../Provider/AuthContext";
import { GiGraduateCap } from "react-icons/gi";
import ScholarshipCard from "./ScholarshipCard"; // import card
import { FaSearch } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";

const AllScholarship = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const { loading } = useContext(AuthContext);

  const countries = ["Germany", "USA", "UK", "Canada", "Australia"];

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/allscholarships/filter`,
          { params: { search, country, category } }
        );
        setScholarships(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScholarships();
  }, [search, country, category]);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        Loading scholarships...
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Page Header */}
      <div className="text-3xl py-5 w-full font-bold text-center text-black flex justify-center gap-4 shadow-lg">
        <GiGraduateCap size={40} className="text-green-800" />
        <h2>Available Scholarships</h2>
      </div>
      <div className="lg:px-30 md:px-10 px-5 mb-15">
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center mt-10">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by name, university, or degree..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm transition pr-10"
            />
            {/* Search Icon */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch size={20} className="text-gray-400" />
            </span>
          </div>

          {/* Country Select */}
          <div className="relative w-full md:w-1/4">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm appearance-none pr-10 bg-white"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {/* Dropdown Arrow Icon */}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
              <FaFileDownload size={20} className="text-blue-600" />
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-8">
          {scholarships.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No scholarships found.
            </p>
          ) : (
            scholarships.map((item) => (
              <ScholarshipCard key={item._id} scholarship={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllScholarship;
