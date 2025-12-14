import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

const TopScholarships = () => {
  const [topScholarships, setTopScholarships] = useState([]);

  useEffect(() => {
    const fetchTopScholarships = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/top-scholarships`
      );
      setTopScholarships(res.data);
    };

    fetchTopScholarships();
  }, []);

  return (
    <div className="p-10 bg-linear-to-b from-[#e9f7f3] to-[#ffffff] min-h-screen">
      {/* TITLE */}
      <h1 className="text-4xl md:mt-20 mt-5 font-extrabold text-center text-[#1b4636]">
        🎓 Top Scholarships
      </h1>

      {/* SUBTITLE */}
      <p className="text-center text-gray-600 mt-2 mb-10 text-lg">
        Explore our hand-picked top 6 scholarships with premium benefits.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {topScholarships.map((sch, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              delay: index * 0.25,
              ease: "easeOut",
            }}
            className="
              relative bg-white/60 backdrop-blur-xl 
              shadow-[0_10px_25px_rgba(0,0,0,0.1)] 
              border border-gray-200 
              rounded-2xl p-5
              hover:shadow-xl transition
            "
          >
            {/* TOP BADGE */}
            <span
              className="
                absolute top-3 right-3 
                bg-green-700
                text-white text-xs font-semibold 
                px-3 py-1 rounded-full shadow
              "
            >
              Top Pick
            </span>

            {/* IMAGE */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={sch.image}
                alt={sch.scholarshipName}
                className="w-full h-44 object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* TITLE */}
            <h2 className="text-xl font-bold text-[#1b4636] mt-4 leading-tight">
              {sch.scholarshipName}
            </h2>

            {/* UNIVERSITY */}
            <p className="text-gray-600 mt-1 text-sm font-medium">
              {sch.universityName}
            </p>

            {/* FEE + DEADLINE */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-[#1b4636] font-bold text-lg">
                ${sch.applicationFees}
              </p>

              <p className="text-red-600 text-sm font-semibold">
                {sch.deadline}
              </p>
            </div>

            {/* BUTTON */}
            <Link to={`/scholarshipdetails/${sch._id}`}>
              <button
                className="
                  mt-5 w-full py-2.5 
                  text-white 
                  rounded-lg font-semibold 
                  transition 
                 bg-[#276B51] hover:bg-[#1a3c30]
                  shadow-md hover:shadow-xl
                "
              >
                View Details
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopScholarships;
