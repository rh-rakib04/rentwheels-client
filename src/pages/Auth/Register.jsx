import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [show, setShow] = useState(false);
  const { createUser, updateUserProfile, signInWithGoogle, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value.trim();
    const photoURL = event.target.photoURL.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    // ✅ Name validation
    if (displayName.length < 5) {
      toast.error("Name must be at least 5 characters long.");
      return;
    }

    // ✅ Password validation
    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExp.test(password)) {
      toast.error(
        "Password must have at least 6 characters, including uppercase and lowercase letters."
      );
      return;
    }

    toast.loading("Creating account...", { id: "register-process" });

    // ✅ Create User
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({ displayName, photoURL })
          .then(() => {
            setUser({ ...user, displayName, photoURL });
            toast.success("Registration successful!", {
              id: "register-process",
            });
            navigate("/");
          })
          .catch((err) =>
            toast.error("Profile update failed: " + err.message, {
              id: "register-process",
            })
          );
      })
      .catch((error) => {
        toast.error(error.message, { id: "register-process" });
      });
  };

  // ✅ Google Sign In
  const handleGoogleSignIn = () => {
    toast.loading("Creating account...", { id: "google-register" });
    signInWithGoogle()
      .then((result) => {
        toast.success("Google account registered successfully!", {
          id: "google-register",
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "google-register" });
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
              placeholder="Enter your full name"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              placeholder="Enter photo URL"
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
              placeholder="Enter your email"
              required
              className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                className="w-full mt-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
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
          <div className="grow border-t border-slate-300 dark:border-slate-600"></div>
          <span className="px-3 text-slate-500 dark:text-slate-400 text-sm">
            OR
          </span>
          <div className="grow border-t border-slate-300 dark:border-slate-600"></div>
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
