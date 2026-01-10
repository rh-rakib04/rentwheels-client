import { motion } from "framer-motion";
import { FaCar, FaMoneyBill, FaUsers } from "react-icons/fa";

const stats = [
  { title: "Total Bookings", value: "124", icon: <FaCar /> },
  { title: "Revenue", value: "$12,450", icon: <FaMoneyBill /> },
  { title: "Customers", value: "89", icon: <FaUsers /> },
];

const Overview = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
        >
          <div className="text-yellow-500 text-3xl mb-3">{s.icon}</div>
          <h3 className="text-gray-600 dark:text-gray-400">{s.title}</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {s.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Overview;
