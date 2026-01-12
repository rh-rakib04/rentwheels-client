import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaEdit,
  FaCarSide,
  FaMapMarkerAlt,
  FaTimes,
  FaDollarSign,
  FaEye,
  FaPlus,
  FaCheckCircle,
  FaTools,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import PageLoader from "../PageLoader";

const MyListings = () => {
  const { user, darkMode } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      // Use the URL structure you verified in the browser screenshot
      fetch(
        `https://rentwheels-server-nine.vercel.app/my-listings/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyCars(data);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Decommission Vehicle?",
      text: "This unit will be permanently removed from active service.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      confirmButtonText: "Confirm Deletion",
      background: darkMode ? "#0a0a0a" : "#fff",
      color: darkMode ? "#fff" : "#000",
      customClass: { popup: "rounded-[2rem] border border-white/10" },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://rentwheels-server-nine.vercel.app/cars/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setMyCars(myCars.filter((car) => car._id !== id));
            toast.success("Unit Decommissioned");
          })
          .catch(() => toast.error("Decommission Failed"));
      }
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8 pb-20">
      {/* 🚀 HEADER & STATS */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1  p-8 rounded-[2.5rem] border border-zinc-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-yellow-500 rounded-full" />
              <h1 className="text-4xl font-black italic uppercase tracking-tighter ">
                My <span className="text-yellow-500">Listings</span>
              </h1>
            </div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] ml-5">
              Manage and monitor your vehicle assets
            </p>
          </div>

          <Link to="/dashboard/add-car">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-black uppercase text-xs tracking-widest rounded-2xl shadow-lg shadow-yellow-500/20"
            >
              <FaPlus /> Add New Unit
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full xl:w-72">
          <StatSmall
            label="Active"
            value={myCars.length}
            color="text-emerald-500"
          />
          <StatSmall label="Status" value="Ready" color="text-yellow-500" />
        </div>
      </div>

      {/* 📊 INVENTORY TABLE */}
      <div className="overflow-hidden rounded-[2.5rem] border border-zinc-500/10  shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-500/10 bg-zinc-500/5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                <th className="px-8 py-6">Vehicle Asset</th>
                <th className="px-8 py-6">Daily Rate</th>
                <th className="px-8 py-6">Base Location</th>
                <th className="px-8 py-6">Availability</th>
                <th className="px-8 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-500/10">
              {myCars.map((car) => (
                <tr
                  key={car._id}
                  className="group hover:bg-yellow-500/[0.02] transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="relative w-20 h-12 rounded-xl overflow-hidden border border-zinc-500/20">
                        <img
                          src={car.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-lg font-black italic uppercase tracking-tighter  group-hover:text-yellow-500 transition-colors">
                          {car.name}
                        </p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          {car.year || "2024"} MODEL
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xl font-black text-yellow-500 italic">
                      ${car.rentPrice}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-bold dark:text-zinc-400 flex items-center gap-2 uppercase tracking-tight">
                      <FaMapMarkerAlt className="text-red-500" size={10} />{" "}
                      {car.location || "Global"}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-emerald-500" size={12} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                        In Stock
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <ActionButton
                        onClick={() => setSelectedCar(car)}
                        icon={<FaEye />}
                        color="hover:bg-blue-500"
                      />
                      <ActionButton
                        icon={<FaEdit />}
                        color="hover:bg-yellow-500"
                      />
                      <ActionButton
                        onClick={() => handleDelete(car._id)}
                        icon={<FaTrash />}
                        color="hover:bg-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📄 TECHNICAL DATA MODAL */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCar(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-4xl overflow-hidden rounded-[3rem] border ${
                darkMode
                  ? "bg-[#0a0a0a] border-white/10"
                  : "bg-white border-slate-200"
              } shadow-2xl`}
            >
              <div className="grid lg:grid-cols-2 h-full">
                <div className="h-64 lg:h-auto border-r border-white/5 relative">
                  <img
                    src={selectedCar.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>

                <div className="p-10 space-y-8">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em] mb-2">
                        Technical Specification
                      </p>
                      <h2 className="text-5xl font-black italic uppercase tracking-tighter dark:text-white">
                        {selectedCar.name}
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedCar(null)}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <SpecItem
                      label="Daily Rate"
                      value={`$${selectedCar.rentPrice}`}
                    />
                    <SpecItem
                      label="Deployment Zone"
                      value={selectedCar.location}
                    />
                    <SpecItem
                      label="Fuel Logic"
                      value={selectedCar.fuel || "N/A"}
                    />
                    <SpecItem
                      label="Year Matrix"
                      value={selectedCar.year || "2024"}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                      Asset Description
                    </p>
                    <p className="text-sm dark:text-zinc-400 italic leading-relaxed">
                      {selectedCar.description ||
                        "No manual override description provided for this unit."}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-yellow-500 text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em]">
                      Update Unit
                    </button>
                    <button
                      onClick={() => setSelectedCar(null)}
                      className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] border border-white/10"
                    >
                      Close File
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatSmall = ({ label, value, color }) => (
  <div className="bg-zinc-500/5 border border-zinc-500/10 p-6 rounded-[2rem] flex flex-col items-center justify-center text-center">
    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">
      {label}
    </p>
    <p className={`text-2xl font-black italic ${color}`}>{value}</p>
  </div>
);

const ActionButton = ({ icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-500/10 text-zinc-400 transition-all hover:text-white ${color}`}
  >
    {icon}
  </button>
);

const SpecItem = ({ label, value }) => (
  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
    <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1">
      {label}
    </p>
    <p className="text-md font-bold dark:text-white uppercase italic">
      {value}
    </p>
  </div>
);

export default MyListings;
