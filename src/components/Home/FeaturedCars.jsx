import React, { use, useState, useEffect } from "react";
import { FaCarSide, FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import CarCard from "../CarCard";
import AOS from "aos";
import "aos/dist/aos.css";

const FeaturedCars = ({ featuredCarsPromise }) => {
  const cars = use(featuredCarsPromise);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter cars by name
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Search Bar */}
      <div className="flex justify-center items-center mb-8 gap-2">
        <FaSearch size={30} />
        <input
          type="text"
          placeholder="Search car by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Car Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <div
              key={car._id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CarCard car={car} />
            </div>
          ))
        ) : (
          <p
            className="text-center text-gray-500 dark:text-gray-400 col-span-full"
            data-aos="fade-up"
          >
            No cars found matching "{searchTerm}".
          </p>
        )}
      </div>

      {/* View All Button */}
      <div className="text-center" data-aos="fade-up">
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
