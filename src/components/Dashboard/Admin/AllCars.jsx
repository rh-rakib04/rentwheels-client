import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaCarSide,
  FaMapMarkerAlt,
  FaUserShield,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";
import Loading from "../../Loading";

const AllCar = () => {
  const { darkMode } = useContext(AuthContext);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://rentwheels-server-nine.vercel.app/cars")
      .then((res) => res.json())
      .then((data) => {
        setAllCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const handleAdminDelete = (id) => {
    Swal.fire({
      title: "Confirm Admin Deletion?",
      text: "As an admin, you are permanently removing this asset from the entire platform.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Remove from Platform",
      background: darkMode ? "#0a0a0a" : "#fff",
      color: darkMode ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://rentwheels-server-nine.vercel.app/cars/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setAllCars(allCars.filter((car) => car._id !== id));
            toast.success("Asset removed by Administrative Action");
          });
      }
    });
  };

  const filteredCars = allCars.filter(
    (car) =>
      car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.providerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="space-y-8 pb-20">
      {/* ADMIN HEADER */}
      <div className="p-8 rounded-[2.5rem] border border-zinc-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-yellow-600 rounded-full" />
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              Platform <span className="text-yellow-400">Inventory</span>
            </h1>
          </div>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] ml-5">
            Global Fleet Overview - {allCars.length} Total Units
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by Car or Owner..."
            className="pl-12 pr-6 py-3 bg-zinc-500/5 border border-zinc-500/10 rounded-2xl outline-none focus:border-red-600 transition-all text-xs font-bold uppercase tracking-widest"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ADMIN TABLE */}
      <div className="overflow-hidden rounded-[2.5rem] border border-zinc-500/10 shadow-2xl bg-zinc-500/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-500/10 bg-zinc-500/5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                <th className="px-8 py-6">Vehicle Asset</th>
                <th className="px-8 py-6">Owner / Provider</th>
                <th className="px-8 py-6">Daily Rate</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-500/10">
              {filteredCars.map((car) => (
                <tr
                  key={car._id}
                  className="group hover:bg-red-600/[0.02] transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <img
                        src={car.image}
                        className="w-20 h-12 rounded-xl object-cover border border-zinc-500/20"
                        alt=""
                      />
                      <div>
                        <p className="text-lg font-black italic uppercase tracking-tighter group-hover:text-red-600">
                          {car.name}
                        </p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          {car.category} | {car.transmission}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-zinc-500/10 rounded-lg">
                        <FaUserShield className="text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold ">
                          {car.providerEmail}
                        </p>
                        <p className="text-[9px] font-black text-emerald-500 uppercase">
                          {car.providerName}
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
                    <p className="text-xs font-bold flex items-center gap-2 uppercase tracking-tight text-zinc-400">
                      <FaMapMarkerAlt className="text-red-600" /> {car.location}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => handleAdminDelete(car._id)}
                      className="h-10 w-10 inline-flex items-center justify-center rounded-xl bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllCar;
