import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthContext";

import { imageUpload } from "../Utility";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  // ..........................  register function..................
  const onSubmit = async (data) => {
    const imageFile = data.photo[0];
    // const formData = new FormData();
    // formData.append("image", imageFile);

    //post rqst to imgbb

    try {
      //   const data = await axios.post(
      //     `https://api.imgbb.com/1/upload?key=${
      //       import.meta.env.VITE_IMGBB_API_KEY
      //     }`,
      //     formData
      //   );
      const imageURL = await imageUpload(imageFile);
      console.log(imageURL);

      createUser(data.email, data.password).then((result) => {
        const user = result.user;
        console.log(user);
      });
    } catch {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };
  // ..........................  register function..................
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Photo Upload */}
          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Photo is required" })}
          />
          {errors.photo && <p>{errors.photo.message}</p>}
          {/* Email Field */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
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
