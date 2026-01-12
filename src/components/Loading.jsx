import { motion } from "framer-motion";
import Lottie from "lottie-react";
import carLoader from "../assets/lottie/car-intro.json";

const Loading = ({ darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`h-[100vh] flex flex-col items-center justify-center `}
    >
      <Lottie animationData={carLoader} loop className="w-70 h-70" />
    </motion.div>
  );
};

export default Loading;
