import React, { use, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const TopRatedCars = ({ featuredCarsPromise }) => {
  const cars = use(featuredCarsPromise);

  return (
    <section className="w-11/12 mx-auto my-20">
      {/* Header */}
      <div className="text-center mb-10" data-aos="fade-down">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-yellow-500 dark:text-yellow-400">
          <FaStar className="text-yellow-500 dark:text-yellow-400" />
          Top Rated Cars
        </h1>
        <p
          className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto"
          data-aos="fade-up"
        >
          Check out the cars that our customers love the most — rated highly for
          performance, comfort, and reliability.
        </p>
      </div>

      {/* Cars Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car, index) => (
          <div
            key={car._id}
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            <figure className="relative">
              <img
                src={car.image}
                alt={car.name}
                className="rounded-t-2xl w-full h-56 object-cover"
              />
              {/* Star Rating Overlay */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-3 py-1 rounded-full text-yellow-400 text-sm font-semibold">
                <FaStar />
                {car.rating || 4.8}
              </div>
            </figure>

            <div className="p-5">
              <h2
                className="text-xl font-semibold mb-1 text-gray-800 dark:text-white"
                data-aos="fade-right"
                data-aos-delay={index * 150}
              >
                {car.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {car.category} • {car.model || "2023"}
              </p>
              <p className="font-semibold text-yellow-500 mb-4">
                ${car.rentPrice}/day
              </p>

              <Link
                to={`/cars/${car._id}`}
                className="inline-block w-full text-center bg-yellow-500 hover:bg-yellow-400 text-white dark:hover:bg-yellow-300 dark:text-black font-semibold py-2 rounded-full transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12" data-aos="fade-up">
        <Link
          to="/browse-cars"
          className="inline-block bg-yellow-500 text-white dark:text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 dark:hover:bg-yellow-300 shadow-md transition-all duration-300"
        >
          View All Cars
        </Link>
      </div>
    </section>
  );
};

export default TopRatedCars;
