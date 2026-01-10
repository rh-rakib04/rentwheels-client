import { motion } from "framer-motion";

const Topbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6"
    >
      <h1 className="font-bold text-lg text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <img
        src="https://i.ibb.co/5GFWbpc/profile3.jpg"
        className="w-10 h-10 rounded-full"
      />
    </motion.header>
  );
};

export default Topbar;
