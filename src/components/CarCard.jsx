import React from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

const CarCard = ({ car }) => {
  const { _id, name, category, rentPrice, image, location } = car;

  return (
    <div
      className="group bg-white dark:bg-slate-900 
      border border-slate-200 dark:border-slate-700 
      rounded-2xl overflow-hidden 
      transition-all duration-300 
      hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover 
          transition-transform duration-500 
          group-hover:scale-105"
        />

        {/* PRICE BADGE */}
        <span
          className="absolute top-3 right-3 
          bg-yellow-400 text-black 
          text-sm font-semibold 
          px-3 py-1 rounded-full flex items-center gap-1"
        >
          <FaTag /> ${rentPrice}/day
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col h-[calc(100%-13rem)]">
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
          {name}
        </h3>

        {/* META */}
        <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-500" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineCategory className="text-yellow-500" />
            <span>{category}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-4">
          <Link
            to={`/cars/${_id}`}
            className="block text-center w-full 
            bg-yellow-400 hover:bg-yellow-500 
            text-black font-semibold 
            py-2.5 rounded-xl 
            transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
