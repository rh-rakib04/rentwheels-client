import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaCar, FaHeadset, FaShieldAlt } from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: <FaUsers />,
    value: 10000,
    suffix: "+",
    label: "Happy Customers",
  },
  {
    id: 2,
    icon: <FaCar />,
    value: 500,
    suffix: "+",
    label: "Elite Fleet",
  },
  {
    id: 3,
    icon: <FaHeadset />,
    value: 24,
    suffix: "/7",
    label: "VIP Concierge",
  },
  {
    id: 4,
    icon: <FaShieldAlt />,
    value: 100,
    suffix: "%",
    label: "Secure Booking",
  },
];

const TrustStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative py-10  transition-colors duration-500 overflow-hidden">
      {/* Background Cinematic Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-yellow-500/5 dark:bg-yellow-400/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-[2.5rem] p-8 text-center bg-black border-1 border-yellow-200 overflow-hidden transition-all duration-500"
            >
              {/* Internal Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-2xl text-yellow-600 dark:text-yellow-400 mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-black shadow-lg dark:shadow-none border border-slate-100 dark:border-zinc-800 group-hover:scale-110 transition-transform duration-500">
                  {stat.icon}
                </div>

                {/* Animated Stat Value */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none mb-2">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  ) : (
                    "0"
                  )}
                </h3>

                {/* Stat Label */}
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {stat.label}
                </p>
              </div>

              {/* Ghost Background Value */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-5xl font-black text-slate-200/30 dark:text-white/[0.02] select-none pointer-events-none">
                {stat.suffix === "+" ? `${stat.value / 1000}K` : stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;