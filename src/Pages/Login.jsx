import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Form, useLocation, useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import loginimg from "../assets/login.png";

const Login = () => {
  const { Login, GoogleLogin, setloading } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  // ===== Email & Password Login =====
  const onSubmit = (data) => {
    Login(data.email, data.password).then(() => {
      reset(); // ✅ form clear
      navigate(from);
    });
  };

  // ===== Google Login =====
  const handleGoogleSignin = () => {
    GoogleLogin().then(() => {
      setloading(false);
      navigate(from);
    });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-3">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* ===== LEFT IMAGE ===== */}
        <div className="hidden lg:flex items-center justify-center bg-[#1b4636] p-10">
          <img
            src={loginimg}
            alt="Login Illustration"
            className="max-w-md w-full"
          />
        </div>

        {/* ===== RIGHT FORM ===== */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 mb-8">
              Login to manage your scholarships easily
            </p>

            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-[#276B51] focus:border-[#276B51]
                  transition shadow-sm"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-[#276B51] focus:border-[#276B51]
                  transition shadow-sm"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot */}
              <div className="flex justify-end">
                <span className="text-sm text-red-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#276B51] text-white 
                font-semibold text-lg hover:bg-[#1b4636] transition shadow-lg"
              >
                Login
              </button>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignin}
                className="flex items-center justify-center gap-3 w-full
                border border-gray-300 py-3 rounded-xl 
                font-semibold hover:bg-gray-100 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600 ">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-[#276B51] font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
