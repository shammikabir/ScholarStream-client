import React from "react";
import { Crown } from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhoneInTalk, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black via-[#0a0f0d] to-[#0d1512] text-gray-300 pt-16 pb-10 border-t border-white/10 text-lg">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* LOGO + INFO */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-md bg-amber-50 flex items-center justify-center">
              <Crown size={22} className="text-[#2C6B58]" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              ScholarStream
            </h2>
          </div>

          <p className=" text-gray-400 leading-relaxed">
            Your trusted platform for finding verified global scholarships.
            Smart search, easy apply, and real-time updates — all in one place.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2  text-gray-400">
            <li className="hover:text-amber-400 transition cursor-pointer">
              Home
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              All Scholarships
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              Top Scholarships
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              Login / Register
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2  text-gray-400">
            <li className="hover:text-amber-400 transition cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              Scholarship Guide
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              Contact Support
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-2  text-gray-400">
            <li className="flex items-center gap-2 hover:text-amber-400 transition">
              <MdEmail className="text-amber-400" /> support@scholarstream.com
            </li>
            <li className="flex items-center gap-2 hover:text-amber-400 transition">
              <MdPhoneInTalk className="text-amber-400" /> +49 123 456 789
            </li>
            <li className="flex items-center gap-2 hover:text-amber-400 transition">
              <MdLocationOn className="text-amber-400" /> Berlin, Germany
            </li>
          </ul>

          {/* SOCIALS */}
          <div className="flex gap-4 mt-5 text-2xl">
            <FaSquareXTwitter className="hover:text-amber-400 cursor-pointer transition" />
            <FaFacebook className="hover:text-amber-400 cursor-pointer transition" />
            <FaLinkedin className="hover:text-amber-400 cursor-pointer transition" />
          </div>
        </div>
      </div>

      {/* BOTTOM AREA */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-amber-400 font-medium">ScholarStream</span>. All
          rights reserved.
        </p>
        <div className="mt-2 space-x-3">
          <a href="#" className="hover:text-amber-400 transition">
            Privacy Policy
          </a>{" "}
          |
          <a href="#" className="hover:text-amber-400 transition">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
