import React from "react";
import { Users, FileText, Award } from "lucide-react";

const StaticBannerInfo = () => {
  return (
    <div className="w-full bg-black bg-opacity-90 py-10 flex  flex-col md:flex-row justify-around items-center">
      {/* Active Users */}
      <div className="flex items-center gap-3 md:mr-0 mr-8">
        <Users className="text-yellow-300" size={38} />
        <div className="text-white">
          <p className="font-bold text-3xl">120K+</p>
          <p className="text-sm text-gray-300">Active Users</p>
        </div>
      </div>

      {/* Scholarship Programs */}
      <div className="flex items-center gap-3 mt-4 md:mt-0">
        <FileText className="text-yellow-300" size={38} />
        <div className="text-white">
          <p className="font-bold text-3xl">500K+</p>
          <p className="text-sm text-gray-300">Scholarship Programs</p>
        </div>
      </div>

      {/* Scholarship Winners */}
      <div className="flex  items-center gap-3 my-4 md:my-0">
        <Award className="text-yellow-300" size={38} />
        <div className="text-white">
          <p className="font-bold text-3xl">50K+</p>
          <p className="text-sm text-gray-300">Scholarship Winners</p>
        </div>
      </div>
    </div>
  );
};

export default StaticBannerInfo;
