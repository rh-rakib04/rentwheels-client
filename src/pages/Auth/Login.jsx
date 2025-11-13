import React, { use, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { signInUser, signInWithGoogle } = use(AuthContext);
  const emailRef = useRef("");
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  // Sign in
  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        // console.log(result.user);
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  //Forget Password
  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    navigate("/auth/forget-password", { state: { email } });
  };

  // Google Sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Login successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error("Login failed. Try again!");
        setError(err.message);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] px-4 transition-all duration-300">
      <div className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl shadow-2xl w-full max-w-md text-[#1E293B] dark:text-white transition-all duration-300">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {/* Form */}
        <form onSubmit={handleLogIn} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              required
              type="email"
              ref={emailRef}
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 rounded-lg bg-[#F1F5F9] dark:bg-[#334155] border border-[#E2E8F0] dark:border-[#475569] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                required
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
                className="w-full p-2 rounded-lg bg-[#F1F5F9] dark:bg-[#334155] border border-[#E2E8F0] dark:border-[#475569] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-4 top-3.5 cursor-pointer text-gray-500"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-sm text-[#2563EB] dark:text-[#93C5FD]">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="hover:underline"
            >
              Forgot Password?
            </button>

            <Link to="/auth/register" className="hover:underline">
              Create Account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
          <span className="px-3 text-slate-500 dark:text-slate-400 text-sm">
            OR
          </span>
          <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-lg font-semibold border border-[#E2E8F0] dark:border-[#475569] hover:bg-slate-100 dark:hover:bg-slate-600 transition-all duration-300"
        >
          <FcGoogle className="text-xl" /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
