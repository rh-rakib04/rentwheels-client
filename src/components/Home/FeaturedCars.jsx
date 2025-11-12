import React, { use } from "react";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router";
import CarCard from "../CarCard";

const FeaturedCars = ({ featuredCarsPromise }) => {
  const cars = use(featuredCarsPromise);

  return (
    <section className="w-11/12 mx-auto my-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-yellow-500 dark:text-yellow-400">
          <FaCarSide className="text-yellow-500 dark:text-yellow-400" />
          Featured Cars
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto">
          Explore our newest and most popular cars — available for rent right
          now.
        </p>
      </div>

      {/* Car Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {cars.map((car) => (
          <div
            key={car._id}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <CarCard car={car} />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Link
          to="/browse-cars"
          className="inline-block bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-black transition-all duration-300 shadow-md"
        >
          View All Cars
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCars;
