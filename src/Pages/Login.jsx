import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Form, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {
  const { Login, GoogleLogin, setloading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  //login function........................
  const onSubmit = (data) => {
    Login(data.email, data.password).then((result) => {
      const user = result.user;
      alert("login succesful");
      navigate(from);
    });
  };

  //google login function

  const handleGoogleSignin = () => {
    GoogleLogin().then((res) => {
      setloading(false);
      navigate(from);
    });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                  />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Login</button>
                  {/* Google Sign-in */}
                  <button
                    type="button"
                    onClick={handleGoogleSignin}
                    className="flex items-center justify-center gap-3 border border-gray-300 bg-[#FFF9F3] text-gray-800 px-5 py-2 rounded-md w-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="google"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>
                </fieldset>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
