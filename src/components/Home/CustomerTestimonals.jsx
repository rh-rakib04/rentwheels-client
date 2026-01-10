import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // Essential for visibility
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    photo: "https://i.ibb.co/mD4S5j8/profile1.jpg",
    review: "RentWheels made my weekend trip absolutely seamless. The booking was quick, the car was spotless, and support was fantastic!",
    rating: 5,
  },
  {
    id: 2,
    name: "Md. Arif Hossain",
    photo: "https://i.ibb.co/d54D9Kn/profile2.jpg",
    review: "Super easy to rent and return. Transparent pricing and smooth experience. Definitely my go-to service from now on.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Islam",
    photo: "https://i.ibb.co/5GFWbpc/profile3.jpg",
    review: "Everything from booking to drop-off was effortless. Highly recommended for anyone looking for premium cars!",
    rating: 5,
  },
];

const CustomerTestimonials = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", review: "", rating: 5 });

  // 1. Prevent background scrolling when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks for your feedback!");
    setShowForm(false);
    setFormData({ name: "", review: "", rating: 5 });
  };

  return (
    <section className="relative py-24  overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative w-11/12 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">
            Trusted by <span className="text-yellow-400">Customers</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light italic">
            Real stories from our premium community of drivers.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="mt-20 relative flex overflow-hidden group">
          <motion.div
            className="flex gap-8 w-max px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="w-[350px] bg-base-900/40 backdrop-blur-md border border-yellow-200 rounded-3xl p-8 text-left"
              >
                <FaQuoteLeft className="text-yellow-400/20 text-4xl mb-4" />
                <p className="text-gray-500 italic mb-6 leading-relaxed">“{t.review}”</p>
                <div className="flex items-center gap-4">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full border-2 border-yellow-400" />
                  <div>
                    <h3 className="font-bold text-white text-sm uppercase">{t.name}</h3>
                    <div className="flex text-yellow-400 text-xs">
                      {[...Array(5)].map((_, idx) => <FaStar key={idx} />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="mt-16 px-12 py-4 rounded-full bg-yellow-400 text-black font-black uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20 active:scale-95"
        >
          Share Your Experience
        </button>
      </div>

      {/* 2. THE PORTAL FIX: Renders outside the MainLayout DOM tree */}
      {showForm && createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 999999 }}>
          <AnimatePresence>
            {showForm && (
              <>
                {/* Backdrop Blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowForm(false)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                />

                {/* Modal Box */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50 }}
                  className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>

                  <h2 className="text-3xl font-black uppercase italic text-yellow-400 mb-6">
                    Post a <span className="text-white">Review</span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1 mb-2 block">Your Name</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-yellow-400 outline-none transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1 mb-2 block">Review Message</label>
                      <textarea
                        rows="4"
                        required
                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-yellow-400 outline-none transition-all resize-none"
                        placeholder="Tell us about the car and the service..."
                        value={formData.review}
                        onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-5 rounded-2xl bg-yellow-400 text-black font-black uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/10"
                    >
                      Submit Experience
                    </button>
                  </form>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </section>
  );
};

export default CustomerTestimonials;