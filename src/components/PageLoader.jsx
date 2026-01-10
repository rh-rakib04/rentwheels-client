import { motion } from "framer-motion";
import Lottie from "lottie-react";
import carLoader from "../assets/lottie/car-intro.json";

const PageLoader = ({ darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-[60vh] flex flex-col items-center justify-center ${
        darkMode ? "bg-transparent text-white" : "bg-transparent text-gray-900"
      }`}
    >
      <Lottie
        animationData={carLoader}
        loop
        className="w-56 h-56"
      />
      <p className="mt-4 text-sm tracking-wide opacity-70">
        Loading premium cars...
      </p>
    </motion.div>
  );
};

export default PageLoader;
