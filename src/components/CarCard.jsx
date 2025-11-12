import React from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

const CarCard = ({ car }) => {
  const { _id, name, category, rentPrice, image, location } = car;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Image */}
      <figure className="overflow-hidden h-52">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </figure>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {name}
        </h2>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
          <FaMapMarkerAlt className="text-yellow-500" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
          <MdOutlineCategory className="text-yellow-500" />
          <span>{category}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="flex items-center gap-1 text-lg font-semibold text-yellow-500">
            <FaTag /> ${rentPrice}/day
          </span>

          <Link
            to={`/car/${_id}`}
            className="btn btn-sm rounded-full bg-yellow-500 hover:bg-yellow-400 text-white transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Hover overlay (optional aesthetic touch) */}
      <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/5 transition-all duration-500"></div>
    </div>
  );
};

export default CarCard;
