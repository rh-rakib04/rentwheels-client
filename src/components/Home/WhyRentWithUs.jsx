import React from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaCarAlt,
  FaMoneyBillWave,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Wide Car Selection",
    desc: "From agile city cars to luxury SUVs, find the perfect ride for any occasion.",
    icon: <FaCarAlt />,
  },
  {
    id: 2,
    title: "Best Price Guarantee",
    desc: "Premium experience shouldn't mean premium prices. We match any local rate.",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 3,
    title: "24/7 Elite Support",
    desc: "Our dedicated concierge team is always one call away, anywhere, anytime.",
    icon: <FaHeadset />,
  },
  {
    id: 4,
    title: "Trusted by Thousands",
    desc: "Join a community of thousands of drivers who choose RentWheels for quality.",
    icon: <FaHandshake />,
  },
];

const WhyRentWithUs = () => {
  return (
    <section className="relative py-10  transition-colors duration-500 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 dark:bg-yellow-400/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-11/12 max-w-7xl mx-auto">
        <div className=" mb-16 text-center">
          <motion.div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none ">
              Why <span className="text-yellow-500 dark:text-yellow-400">Rent</span> With Us?
            </h2>
           
          </motion.div>

          <motion.p className="text-gray-600 dark:text-gray-400 mx-auto max-w-md italic font-light">
            We provide the freedom of the open road with unmatched reliability and style.
          </motion.p>
           <div className="h-1.5 w-24 mx-auto bg-yellow-500 dark:bg-yellow-400 mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={f.id} className="group relative bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-white/5 p-8 rounded-[2rem] overflow-hidden hover:border-yellow-500 dark:hover:border-yellow-400/30 transition-all duration-500">
              <div className="relative z-10">
                <div className="text-4xl text-yellow-600 dark:text-yellow-400 mb-6 inline-block p-4 bg-white dark:bg-black rounded-2xl shadow-sm dark:shadow-[0_0_15px_rgba(250,204,21,0.1)] transition-transform duration-500 group-hover:-rotate-6">
                  {f.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white uppercase tracking-tight group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed transition-colors">
                  {f.desc}
                </p>
              </div>
              <div className="absolute -bottom-4 -right-2 text-9xl font-black text-gray-200/50 dark:text-white/[0.03] pointer-events-none">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRentWithUs;