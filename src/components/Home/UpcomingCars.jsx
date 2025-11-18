import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaClock,
  FaStar,
  FaEnvelopeOpenText,
  FaCheckCircle,
} from "react-icons/fa";

const upcomingCars = [
  {
    id: 1,
    name: "Tesla Model 3 2025",
    image: "/Tesla Model 3 2025.avif",
    release: "January 2026",
    category: "Electric",
    rating: 5,
  },
  {
    id: 2,
    name: "Toyota Supra GR 2025",
    image: "/Toyota Supra GR 2025.avif",
    release: "March 2026",
    category: "Sports",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Range Rover Evoque 2026",
    image: "/Range Rover Evoque 2026.jpg",
    release: "June 2026",
    category: "Luxury SUV",
    rating: 5,
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
    setTimeout(() => {
      setSelectedCar(null);
    }, 2000);
  };

  return (
    <section className="w-11/12 mx-auto my-24 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3 text-yellow-500 dark:text-yellow-400 drop-shadow-lg">
          <FaClock /> Upcoming Cars
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm md:text-lg max-w-2xl mx-auto">
          Experience the future of driving — explore our upcoming arrivals and
          stay ahead of the road.
        </p>
      </motion.div>

      {/* Cars Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingCars.map((car, index) => (
          <Tilt
            key={car.id}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.05}
            transitionSpeed={400}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
            >
              {/* Image with gradient overlay */}
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                  Coming {car.release.split(" ")[0]}
                </span>
              </div>

              {/* Car Details */}
              <div className="p-6 text-left">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-1">
                  {car.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {car.category}
                </p>
                <div className="flex text-yellow-500 mt-2 mb-3">
                  {[...Array(Math.floor(car.rating))].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  {car.rating % 1 !== 0 && <FaStar className="opacity-50" />}
                </div>

                <button
                  onClick={() => handleNotify(car)}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black font-semibold py-2 rounded-full hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-all duration-300"
                >
                  <FaEnvelopeOpenText /> Notify Me
                </button>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>

      {/* Glassmorphic Modal */}
      {selectedCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 dark:bg-gray-900/90 border border-yellow-500/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md text-center relative"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <FaCheckCircle className="text-green-500 text-6xl" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                  You're on the list!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  You’ll get notified when <strong>{selectedCar.name}</strong>{" "}
                  is available.
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  Get Notified for {selectedCar.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">
                  Enter your email to receive a launch alert instantly.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-full hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-all duration-300"
                  >
                    Notify Me
                  </button>
                </form>
              </>
            )}
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default UpcomingCars;
