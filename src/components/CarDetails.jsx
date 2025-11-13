import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  FaCarSide,
  FaMapMarkerAlt,
  FaTag,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const CarDetails = () => {
  const { user, darkMode } = use(AuthContext);
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load car details
  useEffect(() => {
    fetch(
      `https://rentwheels-server-7fh3v8khj-rakibul-hossain-bhuiyas-projects.vercel.app/cars-details/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCar(data.result);
        setLoading(false);
      });
    // .catch((err) => console.error(err));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96 text-yellow-400 text-xl font-semibold">
        Loading car details...
      </div>
    );

  if (!car)
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        ❌ Car not found.
      </div>
    );

  // ✅ Handle Booking
  const handleBooking = async () => {
    if (!user?.email) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to book a car.",
        icon: "info",
        confirmButtonColor: "#facc15",
      });
      return;
    }

    try {
      // 1️⃣ Save booking data
      const bookingData = {
        carId: car._id,
        carName: car.name,
        image: car.image,
        price: car.rentPrice,
        userEmail: user.email,
        date: new Date().toLocaleDateString(),
        status: "Booked",
      };

      const bookingRes = await fetch(
        "https://rentwheels-server-7fh3v8khj-rakibul-hossain-bhuiyas-projects.vercel.app/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (!bookingRes.ok) throw new Error("Failed to save booking");

      // 2️⃣ Update car status to “Unavailable”
      const updateRes = await fetch(
        `https://rentwheels-server-7fh3v8khj-rakibul-hossain-bhuiyas-projects.vercel.app/cars/${car._id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Unavailable" }),
        }
      );

      if (!updateRes.ok) throw new Error("Failed to update car status");

      // 3️⃣ Update UI + toast
      setCar((prev) => ({ ...prev, status: "Unavailable" }));

      Swal.fire({
        title: "Car Booked Successfully!",
        text: "You can see your booking in the 'My Bookings' page.",
        icon: "success",
        confirmButtonColor: "#facc15",
      });
    } catch (error) {
      // console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while booking the car.",
        icon: "error",
      });
    }
  };

  return (
    <div
      className={`min-h-screen py-12 px-6 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border transition-all duration-500 ${
          darkMode
            ? "bg-slate-900/60 border-slate-700"
            : "bg-white/80 border-gray-200"
        }`}
      >
        {/* Back Button */}
        <Link
          to="/browse-cars"
          className={`flex items-center gap-2 font-semibold mb-6 transition ${
            darkMode
              ? "text-yellow-400 hover:text-yellow-300"
              : "text-yellow-600 hover:text-yellow-500"
          }`}
        >
          <IoArrowBack className="text-lg" /> Back to Browse
        </Link>

        {/* Car Image */}
        <div className="relative group mb-10 overflow-hidden rounded-2xl">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 bg-yellow-400 text-black px-5 py-2 rounded-full font-bold shadow-lg text-lg">
            ${car.rentPrice}/day
          </div>
        </div>

        {/* Car Details */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info Section */}
          <div>
            <h1
              className={`text-4xl font-extrabold flex items-center gap-3 mb-3 ${
                darkMode ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              <FaCarSide /> {car.name}
            </h1>
            <p
              className={`mb-6 leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {car.description ||
                "This vehicle offers premium comfort, reliability, and performance to make your trip unforgettable."}
            </p>

            <div className="space-y-4 text-lg">
              <InfoItem
                icon={<FaTag />}
                label="Category"
                value={car.category}
                darkMode={darkMode}
              />
              <InfoItem
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={car.location}
                darkMode={darkMode}
              />
              <InfoItem
                icon={<FaDollarSign />}
                label="Price"
                value={`$${car.rentPrice}/day`}
                darkMode={darkMode}
              />
              <InfoItem
                icon={<FaUser />}
                label="Provider"
                value={user?.displayName || "Not specified"}
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Booking Panel */}
          <div
            className={`p-8 rounded-2xl border shadow-lg flex flex-col justify-center items-center text-center transition-all duration-500 ${
              darkMode
                ? "bg-slate-800/60 border-slate-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <span
              className={`mb-5 px-6 py-2 rounded-full text-sm font-semibold ${
                car.status === "Unavailable"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-500"
              }`}
            >
              {car.status === "Unavailable" ? "Unavailable" : "Available"}
            </span>
            <button
              disabled={car.status === "Unavailable"}
              onClick={handleBooking}
              className={`w-full py-3 rounded-xl font-bold transition ${
                car.status === "Unavailable"
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-500 hover:shadow-yellow-400/40 hover:shadow-lg"
              }`}
            >
              {car.status === "Unavailable" ? "Already Booked" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable InfoItem
const InfoItem = ({ icon, label, value, darkMode }) => (
  <div
    className={`flex items-center gap-3 ${
      darkMode ? "text-gray-300" : "text-gray-700"
    }`}
  >
    <div
      className={`p-2 rounded-lg ${
        darkMode
          ? "bg-yellow-400/10 text-yellow-400"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      {icon}
    </div>
    <span className="font-semibold">{label}:</span> {value}
  </div>
);

export default CarDetails;
