import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaCarSide,
  FaPlus,
  FaImage,
  FaTag,
  FaDollarSign,
  FaMapMarkerAlt,
  FaGasPump,
  FaCogs,
  FaAlignLeft,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { user, darkMode } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value, // Matched key to your MyListings component
      image: form.image.value,
      category: form.category.value,
      rentPrice: form.rentPrice.value, // Matched key to your MyListings component
      location: form.location.value,
      fuel: form.fuelType.value,
      transmission: form.transmission.value,
      description: form.description.value,
      providerEmail: user.email,
      providerName: user.displayName,
      status: "Available",
    };

    fetch("https://rentwheels-server-nine.vercel.app/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Unit Registered to Fleet", {
            style: {
              background: darkMode ? "#111" : "#fff",
              color: darkMode ? "#fff" : "#000",
              borderRadius: "1rem",
              border: darkMode ? "1px solid #333" : "1px solid #eee",
            },
          });
          form.reset();
        }
      })
      .catch(() => toast.error("Registration Failed"));
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* 🏎️ SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-500/10 pb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-yellow-500 rounded-full" />
            <h1 className="text-4xl font-black italic uppercase tracking-tighter ">
              Unit <span className="text-yellow-500">Registration</span>
            </h1>
          </div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] ml-5">
            Onboard new assets to the RentWheels global fleet
          </p>
        </div>
        <div className="bg-zinc-500/5 px-6 py-3 rounded-2xl border border-zinc-500/10 hidden md:block">
          <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">
            Operator Identity
          </p>
          <p className="text-xs font-bold italic">{user?.email}</p>
        </div>
      </motion.div>

      {/* 🛠️ REGISTRATION FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT COLUMN: CORE INFO */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-500/5 border border-zinc-500/10 rounded-[2.5rem] p-8 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputGroup
                label="Vehicle Name"
                name="name"
                icon={<FaCarSide />}
                placeholder="e.g. Tesla Model S Plaid"
              />
              <InputGroup
                label="Asset Image URL"
                name="image"
                icon={<FaImage />}
                placeholder="https://image-cloud.com/unit-01.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SelectGroup label="Category" name="category" icon={<FaTag />}>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Electric">Electric</option>
              </SelectGroup>
              <InputGroup
                label="Daily Rate (USD)"
                name="rentPrice"
                type="number"
                icon={<FaDollarSign />}
                placeholder="150"
              />
              <InputGroup
                label="Deployment Base"
                name="location"
                icon={<FaMapMarkerAlt />}
                placeholder="Dubai, UAE"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <FaAlignLeft className="text-yellow-500" /> Unit Description &
                Specs
              </label>
              <textarea
                name="description"
                required
                rows="5"
                placeholder="Enter technical details, features, and rental terms..."
                className="w-full bg-white dark:bg-black border border-zinc-500/20 rounded-3xl p-5 text-sm dark:text-white focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all resize-none italic"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TECHNICAL SPECS & SUBMIT */}
        <div className="space-y-6">
          <div className="bg-zinc-500/5 border border-zinc-500/10 rounded-[2.5rem] p-8 space-y-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500">
              Mechanical Specs
            </p>

            <SelectGroup
              label="Fuel Logic"
              name="fuelType"
              icon={<FaGasPump />}
            >
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </SelectGroup>

            <SelectGroup
              label="Transmission"
              name="transmission"
              icon={<FaCogs />}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Auto">Semi-Auto</option>
            </SelectGroup>

            <div className="p-5 bg-yellow-500/5 border border-yellow-500/10 rounded-3xl">
              <p className="text-[9px] font-black uppercase text-yellow-600 mb-2">
                Notice
              </p>
              <p className="text-[11px] text-zinc-500 italic leading-relaxed">
                By registering this unit, you confirm it has passed all safety
                inspections and is ready for immediate deployment.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-6 bg-yellow-500 text-black rounded-[2rem] font-black uppercase italic tracking-tighter text-xl shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-3"
          >
            <FaPlus size={18} /> Complete Registration
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

const InputGroup = ({ label, icon, ...props }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
      <span className="text-yellow-500">{icon}</span> {label}
    </label>
    <input
      required
      {...props}
      className="w-full bg-white dark:bg-black border border-zinc-500/20 rounded-2xl px-5 py-4 text-sm dark:text-white font-bold focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all placeholder:text-zinc-600"
    />
  </div>
);

const SelectGroup = ({ label, icon, children, ...props }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
      <span className="text-yellow-500">{icon}</span> {label}
    </label>
    <select
      required
      {...props}
      className="w-full bg-white dark:bg-black border border-zinc-500/20 rounded-2xl px-5 py-4 text-sm dark:text-white font-bold focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all appearance-none cursor-pointer"
    >
      {children}
    </select>
  </div>
);

export default AddCar;
