import { useEffect } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import carAnimation from "../assets/lottie/car-intro.json";

const CarIntroLottie = ({ show, onFinished }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (onFinished) onFinished();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onFinished]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }} // Slight zoom out on exit for "speed"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center">
            {/* Animation Wrapper: Set to opacity 1 and scale 1 immediately for 0ms delay */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-[300px] md:w-[480px] -mb-14 md:-mb-24"
            >
              <Lottie
                animationData={carAnimation}
                loop={false}
                autoplay={true}
              />
            </motion.div>

            {/* Text Content: Reduced delay to 0.2s for faster appearance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-center relative z-10"
            >
              <h1 className="text-yellow-400 text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]">
                RentWheels
              </h1>

              <p className="text-gray-400 text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold mt-4 opacity-70">
                Premium Car Rental Experience
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarIntroLottie;
