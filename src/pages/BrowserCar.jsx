import React, { useState, useEffect, useContext } from "react";
import { FaSearch, FaSlidersH, FaCar } from "react-icons/fa";
import CarCard from "../components/CarCard";
import { AuthContext } from "../context/AuthContext"; // Context for theme

const BrowseCars = () => {
  const { darkMode } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");

  // Filter
  const [selectedType, setSelectedType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");

  //
  useEffect(() => {
    fetch("https://rentwheels-server-nine.vercel.app/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => err);
  }, []);

  // Filter + Sort
  let filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedType)
    filteredCars = filteredCars.filter((car) => car.type === selectedType);
  if (selectedTransmission)
    filteredCars = filteredCars.filter(
      (car) => car.transmission === selectedTransmission
    );
  if (selectedFuel)
    filteredCars = filteredCars.filter((car) => car.fuel === selectedFuel);

  if (sortOption === "Price: Low to High") {
    filteredCars = [...filteredCars].sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price: High to Low") {
    filteredCars = [...filteredCars].sort((a, b) => b.price - a.price);
  } else if (sortOption === "Top Rated") {
    filteredCars = [...filteredCars].sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "Newest") {
    filteredCars = [...filteredCars].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-6 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1
          data-aos="fade-up"
          className="text-4xl md:text-5xl font-extrabold mb-3 flex justify-center items-center gap-3"
        >
          <FaCar
            className={
              darkMode ? "text-yellow-400 text-4xl" : "text-yellow-600 text-4xl"
            }
          />{" "}
          Browse Our Cars
        </h1>
        <p
          data-aos="fade-down"
          className={darkMode ? "text-gray-400" : "text-gray-600"}
        >
          Explore the perfect ride for your next adventure — affordable, luxury,
          or electric.
        </p>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div
        className={`max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-10 p-4 rounded-2xl backdrop-blur transition-colors duration-500 ${
          darkMode ? "bg-slate-800/50" : "bg-white/50"
        }`}
      >
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <FaSearch
            className={`absolute left-3 top-3 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search cars by name..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl border focus:border-yellow-400 outline-none transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 text-white border-slate-700"
                : "bg-white text-gray-900 border-gray-300"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full md:w-1/4">
          <select
            className={`w-full py-2 px-4 rounded-xl cursor-pointer focus:border-yellow-400 transition-colors duration-300 ${
              darkMode
                ? "bg-slate-900 border border-slate-700 text-white"
                : "bg-white border border-gray-300 text-gray-900"
            }`}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-xl transition"
        >
          <FaSlidersH /> Filters
        </button>
      </div>

      {/* FILTER */}
      {filterOpen && (
        <div
          className={`max-w-6xl mx-auto p-6 mb-10 grid md:grid-cols-3 gap-4 rounded-2xl transition-colors duration-300 ${
            darkMode
              ? "bg-slate-800/70 text-gray-300"
              : "bg-white/70 text-gray-800"
          }`}
        >
          {/* Type */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">Car Type</h3>
            <div className="flex flex-wrap gap-3">
              {["SUV", "Sedan", "Electric"].map((type) => (
                <span
                  key={type}
                  onClick={() =>
                    setSelectedType(selectedType === type ? "" : type)
                  }
                  className={`px-3 py-1 rounded-lg cursor-pointer transition ${
                    selectedType === type
                      ? "bg-yellow-400 text-black"
                      : darkMode
                      ? "bg-slate-900 text-white hover:bg-yellow-400 hover:text-black"
                      : "bg-gray-200 text-black hover:bg-yellow-400 hover:text-black"
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">Transmission</h3>
            <div className="flex gap-3">
              {["Automatic", "Manual"].map((trans) => (
                <span
                  key={trans}
                  onClick={() =>
                    setSelectedTransmission(
                      selectedTransmission === trans ? "" : trans
                    )
                  }
                  className={`px-3 py-1 rounded-lg cursor-pointer transition ${
                    selectedTransmission === trans
                      ? "bg-yellow-400 text-black"
                      : darkMode
                      ? "bg-slate-900 text-white hover:bg-yellow-400 hover:text-black"
                      : "bg-gray-200 text-black hover:bg-yellow-400 hover:text-black"
                  }`}
                >
                  {trans}
                </span>
              ))}
            </div>
          </div>

          {/* Fuel */}
          <div>
            <h3 className="text-yellow-400 font-semibold mb-2">Fuel Type</h3>
            <div className="flex gap-3">
              {["Petrol", "Diesel", "Electric"].map((fuel) => (
                <span
                  key={fuel}
                  onClick={() =>
                    setSelectedFuel(selectedFuel === fuel ? "" : fuel)
                  }
                  className={`px-3 py-1 rounded-lg cursor-pointer transition ${
                    selectedFuel === fuel
                      ? "bg-yellow-400 text-black"
                      : darkMode
                      ? "bg-slate-900 text-white hover:bg-yellow-400 hover:text-black"
                      : "bg-gray-200 text-black hover:bg-yellow-400 hover:text-black"
                  }`}
                >
                  {fuel}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CAR GRID */}
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <div className="col-span-full text-center py-10">
            🚫 No cars found. Try adjusting filters or search again.
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
