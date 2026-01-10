import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCar, FaKey, FaChevronRight } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Select Vehicle",
    desc: "Browse our premium fleet with advanced filters to find your elite match.",
  },
  {
    icon: <FaCar />,
    title: "Fast Booking",
    desc: "Reserve your ride with a seamless, high-speed encrypted checkout process.",
  },
  {
    icon: <FaKey />,
    title: "Take The Keys",
    desc: "Pick up your keys and hit the road with 24/7 concierge support.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24  transition-colors duration-500 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-500/5 dark:bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-11/12 max-w-7xl mx-auto relative">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none ">
            How It <span className="text-yellow-500 dark:text-yellow-400">Works</span>
          </h2>
          <p className="text-slate-500 dark:text-gray-400 mt-4 max-w-xl mx-auto italic font-light">
            Three simple steps to transition from the sidewalk to the driver's seat.
          </p>
          <div className="h-1.5 w-24 bg-yellow-500 dark:bg-yellow-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          
          {/* Animated Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[40%] left-0 w-full h-[2px] bg-slate-100 dark:bg-zinc-800 -z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative p-10 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-white/5 hover:border-yellow-500 dark:hover:border-yellow-400/30 transition-all duration-500 z-10"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-5 left-10 bg-slate-900 dark:bg-yellow-400 text-white dark:text-black text-xs font-black w-10 h-10 rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                0{index + 1}
              </div>

              {/* Icon Container */}
              <div className="text-4xl text-yellow-600 dark:text-yellow-400 mb-8 flex justify-start transition-transform duration-500 group-hover:-translate-y-2">
                <div className="p-5 rounded-3xl bg-white dark:bg-black shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-zinc-800">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-black text-2xl mb-4 uppercase italic tracking-tighter text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                {step.title}
              </h3>
              
              <p className=" leading-relaxed font-light italic text-sm">
                {step.desc}
              </p>

              {/* Visual Flow Arrow (Desktop Only) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-8 top-1/2 -translate-y-1/2 text-slate-200 dark:text-zinc-800 text-3xl animate-pulse">
                  <FaChevronRight />
                </div>
              )}
              
              {/* Animated Corner Glow */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-500/5 dark:bg-yellow-400/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;