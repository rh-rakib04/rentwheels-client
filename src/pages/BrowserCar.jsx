import React, { useState, useEffect, useContext, useMemo } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "../components/CarCard";
import PageLoader from "../components/PageLoader";
import { AuthContext } from "../context/AuthContext";

const BrowseCars = () => {
  const { darkMode } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");

  // Filter
  const [selectedType, setSelectedType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://rentwheels-server-nine.vercel.app/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter + Sort
  let filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedType)
    filteredCars = filteredCars.filter((car) => car.category === selectedType);
  if (selectedTransmission)
    filteredCars = filteredCars.filter(
      (car) => car.transmission === selectedTransmission
    );
  if (selectedFuel)
    filteredCars = filteredCars.filter((car) => car.fuelType === selectedFuel);

  if (sortOption === "Price: Low to High") {
    filteredCars = [...filteredCars].sort((a, b) => a.rentPrice - b.rentPrice);
  } else if (sortOption === "Price: High to Low") {
    filteredCars = [...filteredCars].sort((a, b) => b.rentPrice - a.rentPrice);
  } else if (sortOption === "Top Rated") {
    filteredCars = [...filteredCars].sort(
      (a, b) => (b.rating || 0) - (a.rating || 0)
    );
  } else if (sortOption === "Newest") {
    filteredCars = [...filteredCars].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  return (
    <section
      className={`min-h-screen py-14 px-5 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black uppercase italic"
        >
          Browse <span className="text-yellow-400">Cars</span>
        </motion.h1>
        <p className={`mt-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Find your perfect ride — luxury, electric or budget friendly.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div
        className={` z-30 max-w-6xl mx-auto mb-12 p-4 rounded-2xl backdrop-blur-xl shadow-lg ${
          darkMode ? "bg-slate-800/60" : "bg-white/70"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-11 py-2.5 rounded-xl outline-none ${
                darkMode
                  ? "bg-slate-900 border border-slate-700"
                  : "bg-gray-100 border border-gray-300"
              }`}
            />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={`w-full md:w-56 py-2.5 px-4 rounded-xl ${
              darkMode
                ? "bg-slate-900 border border-slate-700"
                : "bg-gray-100 border border-gray-300"
            }`}
          >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>

          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2"
          >
            <FaSlidersH /> Filters
          </button>
        </div>
      </div>
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`max-w-6xl mx-auto mb-10 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 ${
              darkMode ? "bg-slate-800" : "bg-white shadow"
            }`}
          >
            {/* TYPE */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-3 rounded-xl border-2 border-amber-100"
            >
              <option value="">All Types</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Electric">Electric</option>
            </select>

            {/* TRANSMISSION */}
            <select
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="p-3 rounded-xl border-2 border-amber-100"
            >
              <option value="">All Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>

            {/* FUEL */}
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="p-3 rounded-xl border-2 border-amber-100"
            >
              <option value="">All Fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOADER + GRID */}
      <AnimatePresence mode="wait">
        {loading ? (
          <PageLoader darkMode={darkMode} />
        ) : (
          <motion.div
            key="cars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCars.length ? (
              filteredCars.map((car) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center opacity-70">
                🚫 No cars found.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BrowseCars;
