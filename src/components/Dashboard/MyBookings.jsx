import React, { useEffect, useState, useContext } from "react";

import Swal from "sweetalert2";
import { FaTrashAlt, FaCarSide, FaDollarSign, FaClock } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const MyBookings = () => {
  const { user, darkMode } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch bookings for logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`https://rentwheels-server-nine.vercel.app/bookings/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data.result || []);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  // ✅ Handle cancel booking
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this car booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#facc15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      background: darkMode ? "#1e293b" : "#fff",
      color: darkMode ? "#f8fafc" : "#111827",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://rentwheels-server-nine.vercel.app/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setBookings(bookings.filter((b) => b._id !== id));
            Swal.fire({
              title: "Cancelled!",
              text: "Your booking has been successfully cancelled.",
              icon: "success",
              confirmButtonColor: "#facc15",
              background: darkMode ? "#1e293b" : "#fff",
              color: darkMode ? "#f8fafc" : "#111827",
            });
          });
      }
    });
  };

  if (loading)
    return (
      <div className="text-center text-yellow-400 mt-20 text-lg font-semibold">
        Loading your bookings...
      </div>
    );

  return (
    <div
      className={`min-h-screen py-12 px-6 ${
        darkMode
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1
        data-aos="fade-up"
        className="text-4xl font-extrabold flex justify-center items-center gap-3"
      >
        <FaCarSide
          className={`text-4xl my-10 ${
            darkMode ? "text-yellow-400" : "text-yellow-600"
          }`}
        />
        My Booked Cars
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          🚘 You haven’t booked any cars yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((b) => (
            <div
              key={b._id}
              className={`rounded-2xl overflow-hidden shadow-lg border ${
                darkMode ? "border-slate-700 bg-slate-900/50" : "bg-white"
              } transition hover:shadow-yellow-500/30`}
            >
              <img
                src={b.image}
                alt={b.carName}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                  <FaCarSide /> {b.carName}
                </h2>
                <p className="flex items-center gap-2 mt-2 text-gray-300">
                  <FaDollarSign /> ${b.price}/day
                </p>
                <p className="flex items-center gap-2 mt-1 text-gray-400">
                  <FaClock /> Booked On:{" "}
                  <span className="text-gray-200">{b.date}</span>
                </p>
                <button
                  onClick={() => handleCancel(b._id)}
                  className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-lg font-bold hover:bg-yellow-500 hover:shadow-lg flex justify-center items-center gap-2 transition"
                >
                  <FaTrashAlt /> Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
