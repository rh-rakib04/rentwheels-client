import React, { useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  const { darkMode } = useContext(AuthContext);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-center px-4 ${
        darkMode
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Animated 404 Number */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-8xl md:text-9xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg md:text-xl font-medium mb-8 text-gray-400"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Back Button */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50"
      >
        <FaHome className="text-lg" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
