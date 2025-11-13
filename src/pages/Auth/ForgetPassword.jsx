import React, { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useSpring, animated } from "@react-spring/web";
import { MdOutlineEmail } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const ForgetPassword = () => {
  const { user, passwordReset, darkMode } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef("");

  // Prefill email if redirected from login
  useEffect(() => {
    if (location.state?.email) {
      emailRef.current.value = location.state.email;
    }
  }, [location.state]);

  // Animation
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 100, friction: 15 },
  });

  // handle Password Reset
  const handleReset = (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    passwordReset(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
        setTimeout(() => {
          window.open("https://mail.google.com", "_blank");
          navigate("/auth/login");
        }, 2000);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white"
          : "bg-gradient-to-br from-blue-50 via-gray-100 to-emerald-50 text-gray-900"
      }`}
    >
      <animated.div
        style={fadeIn}
        className={`w-full max-w-md rounded-3xl shadow-2xl p-10 border transition-all duration-500 ${
          darkMode
            ? "bg-slate-900/70 border-slate-800"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 text-sm font-medium ${
            darkMode
              ? "text-yellow-400 hover:text-yellow-300"
              : "text-yellow-600 hover:text-yellow-500"
          }`}
        >
          <IoArrowBack /> Back
        </button>

        {/* Title */}
        <h2
          className={`text-3xl font-bold text-center mb-2 ${
            darkMode ? "text-yellow-400" : "text-yellow-600"
          }`}
        >
          Reset Password
        </h2>
        <p
          className={`text-center mb-6 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Enter your registered email to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <MdOutlineEmail
                className={`absolute left-3 top-3 text-xl ${
                  darkMode ? "text-yellow-400" : "text-black-500"
                }`}
              />
              <input
                type="email"
                ref={emailRef}
                required
                placeholder="Enter your email"
                className={`w-full pl-10 p-3 rounded-lg outline-none border focus:ring-2 transition-all duration-300 ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-white focus:ring-yellow-400"
                    : "bg-white border-gray-300 focus:ring-black-500"
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md ${
              darkMode
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-yellow-400 text-white"
            }`}
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer */}
        <p
          className={`text-center mt-6 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Remember your password?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className={`font-semibold hover:underline ${
              darkMode ? "text-yellow-400" : "text-yellow-600-600"
            }`}
          >
            Login
          </button>
        </p>
      </animated.div>
    </div>
  );
};

export default ForgetPassword;
