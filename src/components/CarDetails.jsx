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

const CarDetails = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/cars-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data.result);
        setLoading(false);
      })
      .catch((err) => console.error(err));
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/browse-cars"
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold mb-6"
        >
          <IoArrowBack className="text-lg" /> Back to Browse
        </Link>

        {/* Car Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-900/60 p-8 rounded-2xl shadow-xl border border-slate-800">
          {/* Car Image */}
          <div className="relative group">
            <img
              src={car.image}
              alt={car.name}
              className="rounded-2xl w-full h-[350px] object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-lg shadow-md text-sm">
              ${car.rentPrice}/day
            </div>
          </div>

          {/* Car Info */}
          <div>
            <h1 className="text-4xl font-extrabold mb-4 flex items-center gap-3">
              <FaCarSide className="text-yellow-400" /> {car.name}
            </h1>

            <p className="text-gray-400 mb-6 leading-relaxed">
              {car.description || "No detailed description available."}
            </p>

            {/* Car Attributes */}
            <div className="space-y-3 text-lg">
              <div className="flex items-center gap-3">
                <FaTag className="text-yellow-400" />
                <span className="font-semibold">Category:</span> {car.category}
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-yellow-400" />
                <span className="font-semibold">Location:</span> {car.location}
              </div>

              <div className="flex items-center gap-3">
                <FaDollarSign className="text-yellow-400" />
                <span className="font-semibold">Price:</span> ${car.rentPrice} /
                day
              </div>

              <div className="flex items-center gap-3">
                <FaUser className="text-yellow-400" />
                <span className="font-semibold">Provider:</span>{" "}
                {user.displayName || "Not specified"}
              </div>
            </div>

            {/* Status + Action */}
            <div className="mt-8 flex items-center gap-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  car.status === "Booked"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {car.status || "Available"}
              </span>

              <button
                className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition ${
                  car.status === "Booked"
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black"
                }`}
                disabled={car.status === "Booked"}
              >
                {car.status === "Booked" ? "Already Booked" : "Book Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Optional section: related cars */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          🚘 Explore more vehicles on our{" "}
          <Link
            to="/browse-cars"
            className="text-yellow-400 hover:underline font-medium"
          >
            Browse Cars
          </Link>{" "}
          page.
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
