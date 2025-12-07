import React from "react";
import heroImg from "../assets/Tution_kids_png-removebg-preview.png"; // your image here

const Banner = () => {
  return (
    <div className="w-full bg-[#060b25] text-white font">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* LEFT TEXT */}
        <div className="lg:w-1/2">
          <p className="text-blue-400 font-semibold uppercase tracking-wide">
            Welcome to ScholarStream
          </p>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mt-3">
            We are determined to achieve the
            <span className="text-blue-400 block">
              highest academic excellence
            </span>
          </h1>

          <p className="mt-4 text-gray-300">
            Streamline scholarship process, manage applicants, and ensure
            transparency with our modern management system.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="btn btn-primary">Take a Tour</button>
            <button className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:w-1/2 relative mt-10 lg:mt-0">
          {/* Background Golden Circle */}
          {/* <div className="bg-yellow-300 w-80 h-80 lg:w-[420px] lg:h-[420px] rounded-full absolute top-1/2 -translate-y-1/2 right-10 opacity-80"></div> */}

          {/* Main student image */}
          <img
            src={heroImg}
            alt="Students"
            className="relative z-10 w-[80%] mx-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
