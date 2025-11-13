import React, { useState, useEffect } from "react";
import { FaSearch, FaSlidersH, FaStar, FaCar } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import CarCard from "../components/CarCard";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  // Filter
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white py-12 px-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 flex justify-center items-center gap-3">
          <FaCar className="text-yellow-400 text-4xl" /> Browse Our Cars
        </h1>
        <p className="text-gray-400">
          Explore the perfect ride for your next adventure — affordable, luxury,
          or electric.
        </p>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-slate-800/50 p-4 rounded-2xl backdrop-blur">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search cars by name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 text-white border border-slate-700 focus:border-yellow-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full md:w-1/4">
          <select
            className="w-full bg-slate-900 border border-slate-700 text-white py-2 px-4 rounded-xl cursor-pointer focus:border-yellow-400"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
          {/* <IoIosArrowDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" /> */}
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-xl transition"
        >
          <FaSlidersH /> Filters
        </button>
      </div>

      {/* FILTER PANEL */}
      {filterOpen && (
        <div className="max-w-6xl mx-auto bg-slate-800/70 p-6 rounded-2xl mb-10 grid md:grid-cols-3 gap-4 text-gray-300 animate-fadeIn">
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">Car Type</h3>
            <div className="flex flex-wrap gap-3">
              <span className="bg-slate-900 px-3 py-1 rounded-lg cursor-pointer hover:bg-yellow-400 hover:text-black transition">
                SUV
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg cursor-pointer hover:bg-yellow-400 hover:text-black transition">
                Sedan
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg cursor-pointer hover:bg-yellow-400 hover:text-black transition">
                Electric
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">Transmission</h3>
            <div className="flex gap-3">
              <span className="bg-slate-900 px-3 py-1 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                Automatic
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                Manual
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">Fuel Type</h3>
            <div className="flex gap-3">
              <span className="bg-slate-900 px-3 py-1 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                Petrol
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                Diesel
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                Electric
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CARS GRID */}
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10">
            🚫 No cars found. Try adjusting filters or search again.
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
