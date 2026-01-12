import React, { useState, useEffect, useContext, useMemo } from "react";
import { FaSearch, FaSlidersH, FaTimes, FaCar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "../components/CarCard";
import PageLoader from "../components/PageLoader";
import { AuthContext } from "../context/AuthContext";

const BrowseCars = () => {
  // 1. SAFE CONTEXT ACCESS
  // Ensuring darkMode has a fallback if context isn't ready
  const auth = useContext(AuthContext);
  const darkMode = auth?.darkMode || false;

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");

  const [selectedType, setSelectedType] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetch("https://rentwheels-server-nine.vercel.app/cars")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          // Safety: Ensure data is an array
          setCars(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  // --- LOGIC: Filter + Sort ---
  const filteredCars = useMemo(() => {
    // 2. STRENGTHENED FILTERING
    let result = cars.filter((car) => {
      // Safety check: Ensure car and name exist before string operations
      const name = car?.name?.toLowerCase() || "";
      const brand = car?.brand?.toLowerCase() || ""; // Added brand search support
      const search = searchTerm.toLowerCase();
      
      return name.includes(search) || brand.includes(search);
    });

    if (selectedType) result = result.filter((car) => car.category === selectedType);
    if (selectedTransmission) result = result.filter((car) => car.transmission === selectedTransmission);
    if (selectedFuel) result = result.filter((car) => car.fuelType === selectedFuel);

    // 3. ROBUST SORTING
    const sorted = [...result];
    sorted.sort((a, b) => {
      const priceA = Number(a.rentPrice) || 0;
      const priceB = Number(b.rentPrice) || 0;
      const ratingA = Number(a.rating) || 0;
      const ratingB = Number(b.rating) || 0;

      if (sortOption === "Price: Low to High") return priceA - priceB;
      if (sortOption === "Price: High to Low") return priceB - priceA;
      if (sortOption === "Top Rated") return ratingB - ratingA;
      
      // Default: Newest (using _id or createdAt)
      return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
    });

    return sorted;
  }, [cars, searchTerm, selectedType, selectedTransmission, selectedFuel, sortOption]);

  const resetFilters = () => {
    setSelectedType("");
    setSelectedTransmission("");
    setSelectedFuel("");
    setSearchTerm("");
  };

  return (
    <section className={`min-h-screen py-14 px-5 transition-all duration-500 ${
        darkMode ? "bg-[#050505] text-white" : "bg-gray-50 text-gray-900"
      }`}>
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-yellow-500 text-xs font-black uppercase tracking-[0.4em]">Premium Fleet</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mt-2">
            Explore <span className="text-yellow-400">Wheels</span>
          </h1>
        </motion.div>
      </div>

      {/* SEARCH & ACTION BAR */}
      <div className={`max-w-6xl mx-auto mb-8 p-3 rounded-2xl border backdrop-blur-md sticky top-4 z-40 transition-all ${
          darkMode ? "bg-zinc-900/80 border-zinc-800 shadow-2xl" : "bg-white/80 border-gray-200 shadow-xl"
        }`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by model or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all ${
                darkMode ? "bg-black border border-zinc-800 text-white focus:border-yellow-500" : "bg-gray-100 border border-transparent focus:bg-white focus:border-yellow-400"
              }`}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={`py-3 px-4 rounded-xl font-bold text-sm outline-none cursor-pointer ${
                darkMode ? "bg-zinc-800 border border-zinc-700 text-white" : "bg-gray-100 border border-gray-200"
              }`}
            >
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>

            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 font-black uppercase text-xs tracking-widest transition-all ${
                filterOpen ? "bg-yellow-500 text-black" : darkMode ? "bg-zinc-800 text-white" : "bg-black text-white"
              }`}
            >
              {filterOpen ? <FaTimes /> : <FaSlidersH />} {filterOpen ? "Close" : "Filter"}
            </button>
          </div>
        </div>
      </div>

      {/* FILTER PANEL */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`max-w-6xl mx-auto mb-10 overflow-hidden rounded-3xl border ${
              darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-100 shadow-lg"
            }`}
          >
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <FilterGroup label="Category" value={selectedType} onChange={setSelectedType} options={["SUV", "Sedan", "Electric", "Luxury"]} darkMode={darkMode} />
              <FilterGroup label="Transmission" value={selectedTransmission} onChange={setSelectedTransmission} options={["Automatic", "Manual"]} darkMode={darkMode} />
              <FilterGroup label="Fuel Type" value={selectedFuel} onChange={setSelectedFuel} options={["Petrol", "Diesel", "Electric"]} darkMode={darkMode} />
              
              <div className="flex flex-col justify-end">
                <button onClick={resetFilters} className="text-xs font-bold text-red-500 uppercase tracking-widest hover:underline text-left md:text-center pb-3">
                  Reset All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESULTS GRID */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 px-2">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                Showing {filteredCars.length} results
            </p>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <PageLoader key="loader" darkMode={darkMode} />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCars.length > 0 ? (
                filteredCars.map((car, index) => (
                  <motion.div
                    key={car._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <FaCar className="mx-auto text-5xl mb-4 opacity-10" />
                  <h3 className="text-xl font-bold opacity-30">No matching cars found</h3>
                  <button onClick={resetFilters} className="mt-4 text-yellow-500 font-bold underline">Clear filters</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const FilterGroup = ({ label, value, onChange, options, darkMode }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-transparent border-b-2 py-2 outline-none focus:border-yellow-500 transition-colors cursor-pointer font-bold text-sm ${
        darkMode ? "border-zinc-700 text-white" : "border-gray-200 text-gray-900"
      }`}
    >
      <option value="" className={darkMode ? "bg-zinc-900" : "bg-white"}>All {label}s</option>
      {options.map(opt => (
        <option key={opt} value={opt} className={darkMode ? "bg-zinc-900" : "bg-white"}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default BrowseCars;