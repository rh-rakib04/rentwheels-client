import React, { use, useState, useEffect } from "react";
import { FaCarSide, FaSearch, FaSlidersH } from "react-icons/fa";
import { Link } from "react-router";
import CarCard from "../CarCard";
import { motion, AnimatePresence } from "framer-motion";

const FeaturedCars = ({ featuredCarsPromise }) => {
  const cars = use(featuredCarsPromise);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative py-10  overflow-hidden">
      {/* Cinematic Background Accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-11/12 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none ">
              Featured <span className="text-yellow-400">Cars</span>
            </h2>
            <p className="text-gray-500 mt-4 text-center italic font-light">
              Hand-picked performance and luxury vehicles ready for your next
              adventure.
            </p>
            <div className="h-1.5 mx-auto w-24 bg-yellow-500 dark:bg-yellow-400 my-6 rounded-full" />
          </motion.div>

          {/* Premium Search Bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full md:w-96 group mx-auto"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-yellow-400 transition-colors">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search by model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 backdrop-blur-md transition-all placeholder:text-gray-600 italic"
            />
          </motion.div>
        </div>

        {/* Car Grid with Framer Motion Layout */}
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <motion.div
                  layout
                  key={car._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  {/* Subtle wrapper to match our premium border styles */}
                  <div className="p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent group-hover:from-yellow-400/50 transition-all duration-500">
                    <div className="rounded-[2.5rem] overflow-hidden">
                      <CarCard car={car} />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <FaCarSide className="mx-auto text-6xl text-zinc-800 mb-4" />
                <p className="text-gray-500 text-xl font-light italic">
                  No matching vehicles in our current fleet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/browse-cars"
            className="group relative inline-flex items-center gap-3 bg-white text-black font-black uppercase tracking-widest px-10 py-4 rounded-full hover:bg-yellow-400 transition-all duration-300"
          >
            Explore Full Garage
            <FaCarSide className="group-hover:translate-x-2 transition-transform duration-300" />
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCars;
