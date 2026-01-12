import React, { use } from "react";
import { motion } from "framer-motion";
import {
  FaCar,
  FaMoneyBill,
  FaUsers,
  FaChartLine,
  FaStar,
} from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";

const COLORS = ["#eab308", "#3b82f6", "#a855f7", "#10b981"];

const UserOverview = () => {
  const { darkMode, user } = use(AuthContext);
  const axiosSecure = useAxios();

  // 1. Fetch real data from the API we created
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["analytics", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-analytics/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-yellow-500"></span>
      </div>
    );
  }

  // 2. Map API data to your Stats Grid
  const stats = [
    {
      title: "Total Bookings",
      value: analytics?.stats?.totalBookings || 0,
      icon: <FaCar />,
      change: "+12%",
      color: "from-yellow-400 to-yellow-500",
    },
    {
      title: "Revenue",
      value: `$${analytics?.stats?.totalRevenue || 0}`,
      icon: <FaMoneyBill />,
      change: "+8%",
      color: "from-green-400 to-green-500",
    },
    {
      title: "Customers",
      value: analytics?.stats?.totalCustomers || 0,
      icon: <FaUsers />,
      change: "+15%",
      color: "from-blue-400 to-blue-500",
    },
    {
      title: "Rating",
      value: analytics?.stats?.avgRating || "4.8",
      icon: <FaStar />,
      change: "+0.2",
      color: "from-purple-400 to-purple-500",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-8 text-black shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-2">
            Mission <span className="text-white">Control</span>
          </h2>
          <p className="text-black/80 font-bold uppercase text-xs tracking-[0.2em]">
            Real-time fleet analytics for {user?.displayName || "User"}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} darkMode={darkMode} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Area Chart - USES REAL API DATA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-[2.5rem] border ${
            darkMode ? " border-white/5" : " border-slate-200 shadow-xl"
          }`}
        >
          <h3 className="text-lg font-black uppercase italic mb-6 flex items-center gap-2">
            <FaChartLine className="text-yellow-500" /> Revenue Growth
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics?.revenueHistory || []}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={darkMode ? "#333" : "#ddd"}
                />
                <XAxis
                  dataKey="name"
                  stroke={darkMode ? "#71717a" : "#64748b"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={darkMode ? "#71717a" : "#64748b"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#18181b" : "#fff",
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#eab308"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Fleet Distribution Pie Chart - USES REAL API DATA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-[2.5rem] border ${
            darkMode
              ? "bg-zinc-900/40 border-white/5"
              : "bg-white border-slate-200 shadow-xl"
          }`}
        >
          <h3 className="text-lg font-black uppercase italic mb-6 flex items-center gap-2">
            <FaCar className="text-blue-500" /> Fleet Categories
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.categoryData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(analytics?.categoryData || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ stat, index, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`group relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 ${
      darkMode
        ? "bg-zinc-900/40 border-white/5 shadow-2xl"
        : "bg-white border-slate-200 shadow-lg"
    }`}
  >
    <div
      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg mb-4`}
    >
      {stat.icon}
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
      {stat.title}
    </p>
    <div className="flex items-end justify-between">
      <h3 className="text-2xl font-black italic ">{stat.value}</h3>
      <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
        {stat.change}
      </span>
    </div>
  </motion.div>
);

export default UserOverview;
