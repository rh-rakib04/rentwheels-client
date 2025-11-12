import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  // Sign in
  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Google Sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
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
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 rounded-lg bg-[#F1F5F9] dark:bg-[#334155] border border-[#E2E8F0] dark:border-[#475569] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="w-full p-2 rounded-lg bg-[#F1F5F9] dark:bg-[#334155] border border-[#E2E8F0] dark:border-[#475569] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="flex justify-between text-sm text-[#2563EB] dark:text-[#93C5FD]">
            <Link to="#">Forget Password?</Link>
            <Link to="/auth/register">Create Account</Link>
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
