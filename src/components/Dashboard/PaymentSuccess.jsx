import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCarSide, FaHome } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router";
import confetti from "canvas-confetti";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (sessionId && !isProcessing) {
      setIsProcessing(true)
      fetch("https://rentwheels-server-nine.vercel.app/confirm-car-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Payment Confirmed and Saved!");
            navigate("/dashboard/my-bookings"); // Redirect to history
          }
        });
    }
  }, [sessionId, navigate]);
  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#facc15", "#eab308", "#ca8a04"],
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yellow-50/30 dark:from-slate-900 dark:via-black dark:to-yellow-900/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-2xl">
            <FaCheckCircle className="text-4xl text-white" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-4">
            Payment Successful!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Your booking has been confirmed. You'll receive a confirmation email
            shortly.
          </p>

          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-yellow-200/20 dark:border-yellow-400/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-yellow-400 text-black">
                <FaCarSide />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Booking Confirmed
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Reference: #
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Please check your email for detailed booking information and
              pickup instructions.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Link
            to="/dashboard/my-bookings"
            className="block w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200"
          >
            View My Bookings
          </Link>

          <Link
            to="/"
            className="block w-full px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaHome />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
