import React, { use } from "react";
import { motion } from "framer-motion";
import { FaStar, FaArrowRight, FaTrophy } from "react-icons/fa";
import { Link } from "react-router";

const TopRatedCars = ({ featuredCarsPromise }) => {
  const cars = use(featuredCarsPromise);

  // Take top 3 rated cars
  const sortedCars = [...cars]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  return (
    <section className="relative py-10  transition-colors duration-500 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-yellow-500/5 dark:bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-11/12 max-w-7xl mx-auto relative z-10">
        
        {/* CENTERED HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 mb-6">
            <FaTrophy className="text-sm" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">World Class Fleet</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none ">
            Top Rated <span className="text-yellow-500 dark:text-yellow-400">Masterpieces</span>
          </h2>
          
          <p className="text-slate-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto italic font-light leading-relaxed">
            Discover the highest-performing vehicles in our fleet, rigorously reviewed 
            and loved by our most demanding drivers.
          </p>

          <div className="h-1.5 w-24 bg-yellow-500 dark:bg-yellow-400 mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
        </motion.div>

        {/* Showcase Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {sortedCars.map((car, index) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -12 }}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 shadow-2xl transition-all duration-700"
            >
              {/* Image with High-Speed Zoom Effect */}
              <img
                src={car.image}
                alt={car.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Overlay Gradient (Higher contrast for center look) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Floating Star Badge */}
              <div className="absolute top-8 right-8 bg-yellow-400 text-black px-4 py-2 rounded-2xl flex items-center gap-2 shadow-2xl transform group-hover:rotate-6 transition-transform">
                <FaStar className="text-sm" />
                <span className="font-black text-sm">{car.rating || "5.0"}</span>
              </div>

              {/* Centered Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end items-center p-10 text-center translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-yellow-400 text-[10px] uppercase font-bold tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {car.category}
                </p>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-6">
                  {car.name}
                </h3>
                
                <Link
                  to={`/cars/${car._id}`}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-all duration-300 flex items-center gap-3"
                >
                  View Machine
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-20 text-center"
        >
          <Link
            to="/browse-cars"
            className="inline-block px-12 py-5 rounded-full border-2 border-slate-200 dark:border-zinc-800  font-black text-xs uppercase tracking-[0.3em] hover:bg-yellow-500 hover:border-yellow-500 hover:text-black dark:hover:text-black transition-all duration-500"
          >
            Explore Full Garage
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopRatedCars;