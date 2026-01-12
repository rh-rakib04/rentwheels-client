import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaTrashAlt,
  FaCarSide,
  FaEye,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTimes,
  FaHashtag,
  FaInfoCircle,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import PageLoader from "../PageLoader";

const MyBookings = () => {
  const { user, darkMode } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://rentwheels-server-nine.vercel.app/bookings/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data.result || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Abort Mission?",
      text: "This booking will be terminated permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, Cancel Booking",
      background: darkMode ? "#0a0a0a" : "#fff",
      color: darkMode ? "#fff" : "#000",
      customClass: { popup: "rounded-[2rem] border border-white/10" },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://rentwheels-server-nine.vercel.app/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setBookings(bookings.filter((b) => b._id !== id));
            toast.success("Booking Cancelled");
          });
      }
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-yellow-500 rounded-2xl text-black shadow-lg shadow-yellow-500/20">
              <FaCalendarAlt size={22} />
            </div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter ">
              My <span className="text-yellow-500">Reservations</span>
            </h1>
          </div>
          <p className="text-zinc-500 text-xs italic ml-1">
            Review your upcoming and past vehicle deployments.
          </p>
        </div>
        <div className="bg-zinc-500/5 border border-zinc-500/10 px-4 py-2 rounded-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
            Active Bookings:{" "}
          </span>
          <span className="text-yellow-500 font-black">{bookings.length}</span>
        </div>
      </div>

      {/* TABLE */}
      <div
        className={`overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${
          darkMode
            ? "bg-zinc-900/40 border-white/5 shadow-2xl"
            : "bg-white border-slate-200 shadow-xl"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr
                className={`${
                  darkMode
                    ? "bg-white/5 text-zinc-400"
                    : "bg-slate-50 text-slate-500"
                } text-[10px] font-black uppercase tracking-[0.2em]`}
              >
                <th className="px-8 py-5">Vehicle</th>
                <th className="px-8 py-5">Date Range</th>
                <th className="px-8 py-5">Total Cost</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="group/row hover:bg-yellow-500/[0.02] transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={booking.image}
                        className="w-16 h-10 object-cover rounded-lg border border-white/10"
                        alt=""
                      />
                      <div>
                        <p className="font-black italic uppercase tracking-tight ">
                          {booking.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 flex items-center gap-1 uppercase">
                          <FaMapMarkerAlt size={8} />{" "}
                          {booking.location || "Global Delivery"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold dark:text-zinc-300">
                        {booking.date}
                      </span>
                      <span className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">
                        Confirmed Deployment
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-yellow-500 text-lg">
                      ${booking.rentPrice}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      SECURED
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-3 rounded-xl bg-zinc-500/10 text-zinc-400 hover:bg-yellow-500 hover:text-black transition-all"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS MODAL */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-2xl overflow-hidden rounded-[3rem] border shadow-2xl ${
                darkMode
                  ? "bg-zinc-950 border-white/10"
                  : "bg-white border-slate-200"
              }`}
            >
              {/* Top Visual Section */}
              <div className="h-48 relative">
                <img
                  src={selectedBooking.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-yellow-500 hover:text-black transition-all"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-10 -mt-12 relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-1 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Booking Details
                  </div>
                  <div className="text-zinc-500 text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
                    <FaHashtag /> {selectedBooking._id.slice(-8)}
                  </div>
                </div>

                <h2 className="text-4xl font-black italic uppercase tracking-tighter  mb-8">
                  {selectedBooking.name}
                </h2>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <DetailItem
                    icon={<FaCalendarAlt />}
                    label="Reserved Date"
                    value={selectedBooking.date}
                  />
                  <DetailItem
                    icon={<FaMapMarkerAlt />}
                    label="Pickup Location"
                    value={selectedBooking.location || "Main Terminal"}
                  />
                  <DetailItem
                    icon={<FaInfoCircle />}
                    label="Vehicle Status"
                    value="Prepped for Departure"
                  />
                  <DetailItem
                    icon={<FaCarSide />}
                    label="Service Type"
                    value="Premium Rental"
                  />
                </div>

                <div className="flex items-center justify-between p-6 rounded-[2rem] bg-yellow-500 text-black">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 italic">
                      Total Amount Paid
                    </p>
                    <p className="text-3xl font-black italic uppercase tracking-tighter">
                      ${selectedBooking.rentPrice}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="bg-black text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all"
                  >
                    Close Briefing
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sub-component for Details
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 text-yellow-500">{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">
        {label}
      </p>
      <p className="font-bold  uppercase text-sm tracking-tight italic">
        {value}
      </p>
    </div>
  </div>
);

export default MyBookings;
