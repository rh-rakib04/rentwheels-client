import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  FaMapMarkerAlt,
  FaTag,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import PageLoader from "./PageLoader";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { user, darkMode } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Use a try-catch or .catch to prevent hanging on network errors
    fetch(`https://rentwheels-server-nine.vercel.app/cars-details/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data?.result) {
          setCar(data.result);
        } else {
          setCar(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async () => {
    if (!user?.email) {
      Swal.fire("Login Required", "Please login first", "info");
      return;
    }

    try {
      const res = await fetch(
        "https://rentwheels-server-nine.vercel.app/create-car-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            carId: car._id,
            name: car.name,
            rentPrice: car.rentPrice,
            userEmail: user.email,
          }),
        }
      );

      const data = await res.json();
      window.location.replace(data.url); // 🔥 STRIPE REDIRECT
    } catch (error) {
      Swal.fire("Error", "Payment initiation failed", "error");
    }
  };

  // --- RENDER LOGIC ---
  if (loading) return <PageLoader />;

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500 font-black uppercase tracking-widest">
          Unit Not Found
        </p>
        <Link
          to="/browse-cars"
          className="text-yellow-500 underline uppercase text-xs font-bold"
        >
          Return to Fleet
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 md:px-8 transition-colors duration-500 ${
        darkMode ? "bg-[#050505]" : "bg-zinc-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link
          to="/browse-cars"
          className="inline-flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-yellow-500 transition-colors"
        >
          <IoArrowBack size={16} /> Back to Fleet
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* LEFT: ASSET VISUALS */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative rounded-[3rem] overflow-hidden border border-zinc-500/10 shadow-2xl bg-black group">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-[500px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                  Technical Data Sheet
                </p>
                <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
                  {car.name}
                </h1>
              </div>
            </div>

            <div
              className={`p-10 rounded-[3rem] border ${
                darkMode
                  ? "bg-zinc-900/40 border-white/5"
                  : "bg-white border-zinc-200"
              }`}
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">
                Mission Description
              </h3>
              <p
                className={`text-lg italic leading-relaxed ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {car.description ||
                  "A high-performance vehicle optimized for premium comfort and tactical reliability. Perfect for those who demand excellence in every mile."}
              </p>
            </div>
          </div>

          {/* RIGHT: TRANSACTION TERMINAL */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className={`p-8 rounded-[3rem] border sticky top-24 ${
                darkMode
                  ? "bg-zinc-900/40 border-white/10"
                  : "bg-white border-zinc-200"
              } shadow-2xl`}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Rental Rate
                  </p>
                  <p className="text-4xl font-black italic text-yellow-500">
                    ${car.rentPrice}
                    <span className="text-sm text-zinc-500 not-italic">
                      /DAY
                    </span>
                  </p>
                </div>
                <div
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    car.status === "Unavailable"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {car.status || "Active"}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <SpecDetail
                  icon={<FaTag />}
                  label="Class"
                  value={car.category}
                  darkMode={darkMode}
                />
                <SpecDetail
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={car.location}
                  darkMode={darkMode}
                />
                <SpecDetail
                  icon={<FaShieldAlt />}
                  label="Insurance"
                  value="Included"
                  darkMode={darkMode}
                />
                <SpecDetail
                  icon={<FaCalendarAlt />}
                  label="Min. Term"
                  value="1 Day"
                  darkMode={darkMode}
                />
              </div>

              <button
                disabled={car.status === "Unavailable"}
                onClick={handleBooking}
                className={`w-full py-6 rounded-2xl font-black uppercase italic tracking-[0.1em] text-lg transition-all shadow-lg ${
                  car.status === "Unavailable"
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                    : "bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-[1.02] shadow-yellow-500/20 active:scale-95"
                }`}
              >
                {car.status === "Unavailable"
                  ? "Unit Offline"
                  : "Initiate Checkout"}
              </button>

              <p className="text-[9px] text-center uppercase font-bold text-zinc-500 mt-6 tracking-widest opacity-50">
                Secure 256-bit Encrypted Transaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper Component */
const SpecDetail = ({ icon, label, value, darkMode }) => (
  <div
    className={`flex items-center justify-between p-4 rounded-2xl ${
      darkMode ? "bg-black/40" : "bg-zinc-50"
    }`}
  >
    <div className="flex items-center gap-3">
      <span className="text-yellow-500 text-sm">{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
        {label}
      </span>
    </div>
    <span
      className={`text-xs font-bold uppercase italic ${
        darkMode ? "text-white" : "text-zinc-800"
      }`}
    >
      {value}
    </span>
  </div>
);

export default CarDetails;
