import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid 
} from "recharts";
import { motion } from "framer-motion";
import { FaWallet, FaCar, FaUsers, FaArrowTrendUp, FaBolt, FaCircle } from "react-icons/fa6";
import Loading from "../../Loading";

const COLORS = ["#EAB308", "#3B82F6", "#EF4444", "#10B981", "#A855F7"];

const AdminOverview = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetch("https://rentwheels-server-nine.vercel.app/admin-stats").then(res => res.json())
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-2 space-y-8  min-h-screen ">
      {/* 1. HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Dashboard <span className="text-yellow-500">Overview</span></h1>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mt-1">Real-time Platform Intelligence</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-black text-zinc-500 uppercase">System Status</p>
          <p className="text-emerald-500 font-bold flex items-center gap-2 justify-end uppercase text-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Data Stream
          </p>
        </div>
      </div>

      {/* 2. KPI OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Monthly Revenue" 
          value={`$${data.cards.revenue.total}`} 
          trend={`${data.cards.revenue.growth}%`} 
          icon={<FaWallet />} 
          subText="vs previous 30 days"
        />
        <MetricCard 
          title="Fleet Capacity" 
          value={data.cards.fleet.total} 
          trend={`${Math.round((data.cards.fleet.available / data.cards.fleet.total) * 100)}%`} 
          icon={<FaCar />} 
          subText="Availability rate"
        />
        <MetricCard 
          title="Total Community" 
          value={data.cards.bookings.users} 
          trend={`+${data.cards.bookings.total}`} 
          icon={<FaUsers />} 
          subText="Cumulative bookings"
        />
      </div>

      {/* 3. BENTO GRID CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto">
        
        {/* LINE CHART: REVENUE TREND (Large) */}
        <div className="lg:col-span-8 bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <FaArrowTrendUp className="text-yellow-500" /> Revenue Trajectory
            </h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.lineChart}>
                <defs>
                  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EAB308" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 11}} />
                <Tooltip content={<CustomTooltip />} cursor={{stroke: '#EAB308', strokeWidth: 1}} />
                <Area type="monotone" dataKey="amount" stroke="#EAB308" strokeWidth={4} fill="url(#glow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART: TOP EARNERS (Side) */}
        <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-8 self-start">Top Revenue Assets</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.pieChart} innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value">
                  {data.pieChart.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4 w-full">
            {data.pieChart.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase">
                <span className="flex items-center gap-2 text-zinc-500"><FaCircle style={{color: COLORS[i]}} size={6} /> {item.name}</span>
                <span className="text-white">${item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BAR CHART: CATEGORY DISTRIBUTION (Full Width) */}
        <div className="lg:col-span-12 bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem]">
           <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-8 flex items-center gap-2">
             <FaBolt className="text-yellow-500" /> Inventory Velocity by Category
           </h3>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={data.barChart} barGap={12}>
                 <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: '#52525b', fontSize: 11}} />
                 <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                 <Bar dataKey="total" fill="#27272a" name="Total Fleet" radius={[6, 6, 0, 0]} />
                 <Bar dataKey="booked" fill="#EAB308" name="Currently Booked" radius={[6, 6, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

/* HELPER COMPONENTS */
const MetricCard = ({ title, value, trend, icon, subText }) => (
  <motion.div whileHover={{ scale: 1.02 }} className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2.5rem] relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 text-6xl text-white/[0.03] group-hover:text-yellow-500/[0.05] transition-colors">
      {icon}
    </div>
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-yellow-500 text-black rounded-2xl">{icon}</div>
      <div className="text-right">
        <span className="text-emerald-500 text-xs font-black italic">{trend}</span>
      </div>
    </div>
    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{title}</p>
    <h2 className="text-4xl font-black italic tracking-tighter mt-1">{value}</h2>
    <p className="text-[9px] font-bold text-zinc-600 uppercase mt-2">{subText}</p>
  </motion.div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-zinc-800 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black text-zinc-500 uppercase mb-1">{payload[0].payload.name}</p>
        <p className="text-xl font-black text-yellow-500">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default AdminOverview;