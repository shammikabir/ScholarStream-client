import React from "react";
import heroImg from "../assets/bgimg2.png";
import bannerBg from "../assets/Untitled design (4).png";
import Typewriter from "typewriter-effect";
import { Search, Users, FileText, Award } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full bg-linear-to-r from-[#1a3c30] via-[#276B51] to-[#2C6B58] text-white font-sans">
      <div className="max-w-7xl  flex flex-col lg:flex-row items-center justify-between lg:mx-auto md:mx-10 mx-10">
        {/* LEFT TEXT */}
        <div className="lg:w-[55%] ">
          {/* Welcome Badge */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-300 lg:mt-0 md:mt-10 mt-10"></div>
            <p className="text-white font-semibold uppercase tracking-wide lg:mt-0 md:mt-10 mt-10">
              Welcome to ScholarStream
            </p>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mt-5">
            <Typewriter
              options={{
                strings: [
                  "We are determined to achieve the highest academic excellence",
                  "Empowering students with scholarship opportunities",
                  "Smart & Modern Scholarship Management System",
                ],
                autoStart: true,
                loop: true,
                delay: 40,
              }}
            />
          </h1>

          <p className="mt-4 text-gray-300">
            Streamline scholarship process, manage applicants, and ensure
            transparency with our modern management system.
          </p>

          <div className="mt-6">
            <button className="flex items-center gap-2 bg-amber-50 font-bold text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-300">
              <Search size={18} className="font-bold" />
              Search Scholarship
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:w-1/2 relative mt-20 lg:mt-25 ">
          {/* Background Golden Circle */}
          {
            <div className="bg-yellow-300 w-60 h-60 lg:w-[320px] lg:h-[320px] rounded-full absolute top-1/2 -translate-y-1/2 lg:right-10 hidden lg:block opacity-80"></div>
          }

          {/* Main student image */}
          <img
            src={heroImg}
            alt="Students"
            className="relative z-10 w-full lg:mx-30 mx-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
