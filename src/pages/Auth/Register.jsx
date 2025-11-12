import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = use(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(displayName, photoURL);
        toast.success("User created successfully!", { id: "create-user" });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { id: "create-user" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Creating user...", { id: "create-user" });
    signInWithGoogle()
      .then((result) => {
        toast.success("User created successfully!", { id: "create-user" });
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { id: "create-user" });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 transition-all duration-500">
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 w-full max-w-md border border-slate-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              type="text"
              name="displayName"
              placeholder="Enter Your Name"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Photo URL
            </label>
            <input
              name="photoURL"
              type="text"
              placeholder="Enter Photo URL"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 rounded-lg shadow transition-all duration-300"
          >
            Register
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

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-lg font-semibold shadow hover:bg-slate-100 dark:hover:bg-slate-600 transition-all duration-300"
        >
          <FcGoogle className="text-xl" /> Register with Google
        </button>

        {/* Footer link */}
        <p className="text-sm text-center mt-6 text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
