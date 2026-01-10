import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaClock,
  FaEnvelopeOpenText,
  FaCheckCircle,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

const upcomingCars = [
  {
    id: 1,
    name: "Tesla Model 3 2025",
    image: "/Tesla Model 3 2025.avif",
    release: "January 2026",
    category: "Electric Performance",
    desc: "The next evolution of the world's most popular EV, featuring Ludicrous mode and a redesigned glass cockpit.",
  },
  {
    id: 2,
    name: "Toyota Supra GR 2025",
    image: "/Toyota Supra GR 2025.avif",
    release: "March 2026",
    category: "Pure Sports",
    desc: "A track-focused beast with a manual transmission option and carbon-fiber aero upgrades.",
  },
  {
    id: 3,
    name: "Range Rover Evoque 2026",
    image: "/Range Rover Evoque 2026.jpg",
    release: "June 2026",
    category: "Luxury SUV",
    desc: "Refined British luxury meets modern ruggedness. Now with a 100% silent electric drivetrain.",
  },
];

const UpcomingCars = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (car) => {
    setSelectedCar(car);
    setSubmitted(false);
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setSelectedCar(null), 2500);
  };

  return (
    <section className="relative py-10  transition-colors duration-500 overflow-hidden">
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-11/12 max-w-7xl mx-auto relative z-10">
        
        {/* CENTERED HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 mb-6">
            <FaClock className="text-sm animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Future is Coming</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none ">
            Future <span className="text-yellow-500 dark:text-yellow-400">Arrivals</span>
          </h2>
          
          <p className="text-slate-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto italic font-light leading-relaxed">
            Get exclusive priority access to the most anticipated releases of 2026. Be the first to command the next generation.
          </p>

          <div className="h-1.5 w-24 bg-yellow-500 dark:bg-yellow-400 mx-auto mt-8 rounded-full" />
        </motion.div>

        {/* Cars Grid - Flex stretch ensures same height */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {upcomingCars.map((car, index) => (
            <Tilt
              key={car.id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.02}
              transitionSpeed={1000}
              className="flex"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col w-full bg-gray-50 dark:bg-zinc-900/40 rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl transition-all duration-500"
              >
                {/* Image Section (Fixed Height) */}
                <div className="relative h-64 shrink-0 overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-zinc-900 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-6 left-6 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg">
                    {car.release.split(" ")[0]} 2026
                  </div>
                </div>

                {/* Content Section (Grows to fill space) */}
                <div className="p-10 flex flex-col flex-grow -mt-4 relative z-20">
                  <p className="text-yellow-600 dark:text-yellow-500/60 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    {car.category}
                  </p>
                  
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter  mb-4">
                    {car.name}
                  </h3>

                  <p className="text-sm  font-light italic leading-relaxed mb-8 flex-grow">
                    {car.desc || "Exclusively curated for the RentWheels Elite collection. Experience unparalleled engineering."}
                  </p>

                  {/* Button always at bottom */}
                  <button
                    onClick={() => handleNotify(car)}
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest py-5 rounded-2xl hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-all duration-300 group/btn shadow-lg"
                  >
                    <FaEnvelopeOpenText className="text-sm" />
                    Priority Alert
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Background "Ghost" Accent */}
                <div className="absolute -bottom-4 -right-4 text-8xl font-black text-black/[0.03] dark:text-white/[0.02] italic select-none pointer-events-none group-hover:text-yellow-500/5 transition-colors">
                  0{index + 1}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>

      {/* Modal remains the same high-quality implementation */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCar(null)}
              className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden text-center"
            >
              <button onClick={() => setSelectedCar(null)} className="absolute top-8 right-8 text-gray-400 hover:text-red-500 transition-colors z-10"><FaTimes size={20} /></button>
              {submitted ? (
                <div className="py-10">
                   <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><FaCheckCircle size={40} /></div>
                   <h2 className="text-3xl font-black italic uppercase text-slate-900 dark:text-white mb-2">You're In</h2>
                   <p className="text-slate-500 dark:text-gray-400 font-light italic">The future is worth the wait.</p>
                </div>
              ) : (
                <>
                  <p className="text-yellow-600 dark:text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Priority Access</p>
                  <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-8">Secure Your <span className="text-yellow-500">Alert</span></h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-gray-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:border-yellow-500 outline-none transition-all italic" />
                    <button type="submit" className="w-full bg-yellow-500 text-black font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-yellow-400 shadow-lg transition-all">Enable Priority Notify</button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default UpcomingCars;