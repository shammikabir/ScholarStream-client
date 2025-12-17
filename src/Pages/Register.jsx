import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthContext";
import useDocumentTitle, { imageUpload, saveOrUpdateUser } from "../Utility";
import { toast } from "react-toastify";
import { useLocation, useNavigate, Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";
import loginimg from "../assets/login.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  useDocumentTitle("Register | ScholarStream");
  const { createUser, GoogleLogin } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await GoogleLogin();
      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message); // show Firebase error in toast
    }
  };

  // Handle normal registration
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];
    try {
      const imageURL = await imageUpload(imageFile);
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: imageURL,
      });
      await saveOrUpdateUser({ name, email, image: imageURL });
      toast.success("Registration Successful");
      navigate(from, { replace: true });
    } catch (error) {
      // Show Firebase error in toast
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Email is already in use");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email address");
            break;
          case "auth/weak-password":
            toast.error("Password is too weak");
            break;
          default:
            toast.error(error.message);
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  // Image Preview
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-3">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div className="hidden lg:flex items-center justify-center bg-[#1b4636] p-6">
          <img
            src={loginimg}
            alt="Register Illustration"
            className="max-h-[80vh] w-auto"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Create Your Account
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Join and manage scholarships easily
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#276B51]"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <label
                    className="w-16 h-15 bg-gray-100 rounded-full border border-gray-300
                                      flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-black text-sm">Upload</span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("image", { required: "Photo is required" })}
                      onChange={(e) => {
                        handleImagePreview(e);
                        register("image").onChange(e);
                      }}
                    />
                  </label>
                  <span className="text-gray-500 text-sm">
                    Max 2MB. JPG/PNG.
                  </span>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#276B51]"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block mb-1 font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 rounded-xl border
      ${
        errors.password
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-[#276B51]"
      }
      focus:outline-none focus:ring-2`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: {
                      hasUpper: (v) =>
                        /[A-Z]/.test(v) ||
                        "Must contain at least 1 uppercase letter",
                      hasLower: (v) =>
                        /[a-z]/.test(v) ||
                        "Must contain at least 1 lowercase letter",
                      hasNumber: (v) =>
                        /[0-9]/.test(v) || "Must contain at least 1 number",
                    },
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#276B51] text-white font-semibold text-lg hover:bg-[#1b4636] transition"
              >
                Register
              </button>

              {/* Google */}
              <div
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-3 border py-2 rounded-xl cursor-pointer hover:bg-gray-100 transition"
              >
                <FcGoogle size={26} />
                <span className="font-medium">Continue with Google</span>
              </div>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600 pt-2">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-[#276B51] font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
