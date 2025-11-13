import React from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

const CarCard = ({ car }) => {
  const { _id, name, category, rentPrice, image, location } = car;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
      <figure className="overflow-hidden h-52">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </figure>

      <div className="p-5">
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
            to={`/cars/${_id}`}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-xl mt-3"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
