import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Shared/Loading";
import { AuthContext } from "../Provider/AuthContext";
import { GiGraduateCap } from "react-icons/gi";
import ScholarshipCard from "./ScholarshipCard"; // import card
import { FaSearch } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";

const AllScholarship = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [sort, setSort] = useState("");

  const [scholarships, setScholarships] = useState([]);
  const { loading } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 6;

  const [totalPages, setTotalPages] = useState(1);

  const countries = ["Germany", "USA", "UK", "Canada", "Australia"];

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/allscholarships/filter`,
          { params: { search, country } }
        );
        setScholarships(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScholarships();
  }, [search, country]);

  //sort
  useEffect(() => {
    const loadSortedScholarships = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/allscholarships/sort`,
          {
            params: { sort },
          }
        );
        setScholarships(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadSortedScholarships();
  }, [sort]);

  //pagination
  useEffect(() => {
    const fetchScholarships = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/allscholarships/paginated`,
        {
          params: {
            page,
            limit,
          },
        }
      );

      setScholarships(data.scholarships);
      setTotalPages(data.totalPages);
    };

    fetchScholarships();
  }, [page]);

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
          {/* sort */}
          <div className="flex justify-center my-8">
            <div className="relative w-full max-w-xs">
              {/* Icon */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                {sort === "b-a" ? (
                  <FaSortAmountDownAlt size={18} />
                ) : (
                  <FaSortAmountUp size={18} />
                )}
              </div>

              {/* Select */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white
                 focus:outline-none focus:ring-2 focus:ring-green-600
                 shadow-sm text-gray-700 font-medium appearance-none cursor-pointer"
              >
                <option value="">Sort by Application Fee</option>
                <option value="a-b">Fee: Low → High</option>
                <option value="b-a">Fee: High → Low</option>
              </select>
            </div>
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

      {/* paginate button */}
      <div className="flex justify-center mt-12 gap-2 mb-15">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-4 py-2 rounded-lg font-semibold transition
        ${
          page === num + 1
            ? "bg-black text-white"
            : "bg-white border border-gray-300 hover:bg-gray-100"
        }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
