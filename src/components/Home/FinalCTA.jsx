import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaSearch, FaEnvelope, FaArrowRight } from "react-icons/fa";

const FinalCTA = () => {
  return (
    <section className="relative py-10  transition-colors duration-500 overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-yellow-400 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-6 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
        >
          Limited Availability
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none  mb-8"
        >
          Ready to <br />
          <span className="text-yellow-500 dark:text-yellow-400 underline decoration-yellow-500/20 underline-offset-8">
            Command
          </span> The Road?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-slate-600 dark:text-gray-400 text-lg italic font-light leading-relaxed mb-12"
        >
          Whether it's a high-performance supercar for the weekend or a premium 
          SUV for your next expedition, your perfect machine is waiting.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/browse-cars"
            className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all duration-300 hover:bg-yellow-500 dark:hover:bg-yellow-400 hover:scale-105"
          >
            <FaSearch className="text-xs" />
            Find Your Car
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-3 border-2 border-slate-200 dark:border-zinc-800  font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all duration-300 hover:border-yellow-500 dark:hover:border-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-400"
          >
            <FaEnvelope className="text-xs" />
            Talk to Concierge
          </Link>
        </motion.div>

        {/* Bottom Decorative Line */}
        <div className="mt-20 flex justify-center items-center gap-4 opacity-30">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-slate-400 dark:to-zinc-700" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-slate-400 dark:to-zinc-700" />
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;