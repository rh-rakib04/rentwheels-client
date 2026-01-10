import React from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaTag, FaChevronRight } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

const CarCard = ({ car }) => {
  const { _id, name, category, rentPrice, image, location } = car;

  return (
    <div
      className="group relative  
     bg-white dark:bg-zinc-900/50
      rounded-[2rem] overflow-hidden 
      transition-all duration-500 
      hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
      hover:-translate-y-2"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover 
          transition-transform duration-700 
          group-hover:scale-110"
        />
        
        {/* OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* PRICE TAG - High Contrast */}
        <div
          className="absolute bottom-4 left-4 
          bg-yellow-400  
          text-xs font-black uppercase tracking-widest
          px-4 py-2 rounded-lg shadow-xl flex items-center gap-2
          transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500"
        >
          <FaTag /> ${rentPrice} <span className="font-light opacity-70">/ Day</span>
        </div>
        
        {/* TOP BADGE */}
        <span className="absolute top-4 right-4 bg-white/90 dark:bg-black/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-tighter px-3 py-1 rounded-md text-slate-900 dark:text-yellow-400 border border-white/20">
          Featured
        </span>
      </div>

      {/* CONTENT AREA */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-yellow-600 dark:text-yellow-500/60 mb-1">
              {category}
            </p>
            <h3 className="text-xl font-black italic uppercase tracking-tighter t leading-none">
              {name}
            </h3>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="flex items-center gap-4 py-4 border-y border-slate-100 dark:border-white/5 mt-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-gray-400">
            <FaMapMarkerAlt className="text-yellow-500" />
            <span>{location}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700" />
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-gray-400">
            <MdOutlineCategory className="text-yellow-500" />
            <span>Automatic</span> {/* Or any static car spec */}
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="mt-6">
          <Link
            to={`/cars/${_id}`}
            className="group/btn flex items-center justify-center gap-2 w-full 
            bg-slate-900 dark:bg-white
            text-white dark:text-black 
            text-xs font-black uppercase tracking-[0.2em]
            py-4 rounded-xl
            transition-all duration-300
            hover:bg-yellow-500 dark:hover:bg-yellow-400"
          >
            Explore Car
            <FaChevronRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;