import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthContext";
import { imageUpload, saveOrUpdateUser } from "../Utility";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, GoogleLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // -----------------------------
  // Google Sign-In
  // -----------------------------
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await GoogleLogin();

      // Save user to MongoDB
      await saveOrUpdateUser({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // -----------------------------
  // Form Submit Handler
  // -----------------------------
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      // 1Upload image to imgbb
      const imageURL = await imageUpload(imageFile);

      // 2 Create Firebase User
      const result = await createUser(email, password);
      const user = result.user;

      // 3 Update Firebase Profile
      await updateProfile(user, {
        displayName: name,
        photoURL: imageURL,
      });

      // 4 Save user to MongoDB
      await saveOrUpdateUser({
        name,
        email,
        image: imageURL,
      });

      toast.success("Registration Successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
              {...register("name", {
                required: "Name is required",
                maxLength: 20,
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block mb-2 text-sm">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Photo is required" })}
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Google Sign-In */}
          <div
            onClick={handleGoogleSignIn}
            className="flex justify-center items-center space-x-2 border p-2 cursor-pointer hover:bg-gray-100 rounded-md"
          >
            <FcGoogle size={32} />
            <p>Continue with Google</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <a href="/auth/login" className="text-blue-600 font-semibold ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
