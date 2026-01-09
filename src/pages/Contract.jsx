import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
  e.preventDefault();

  toast.success("Message sent successfully 🚗✨", {
    icon: "📨",
  });

  e.target.reset();
};

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* HERO */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact <span className="text-yellow-500">RentWheels</span>
          </motion.h1>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            Have questions, feedback, or partnership ideas?  
            We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* LEFT – INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-semibold">
              Get in Touch
            </h2>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              RentWheels is a modern car rental platform built to provide a smooth,
              secure, and user-friendly experience.  
              Feel free to contact us for support, collaboration, or general inquiries.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <FaEnvelope />,
                  label: "Email",
                  value: "support@rentwheels.com",
                },
                {
                  icon: <FaPhoneAlt />,
                  label: "Phone",
                  value: "+880 1XXX-XXXXXX",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: "Location",
                  value: "Chattogram, Bangladesh",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl
                  border border-slate-200 dark:border-slate-800
                  bg-white dark:bg-slate-900"
                >
                  <div className="text-yellow-500 text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT – FORM */}
          <motion.form
  onSubmit={handleSubmit}
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  className="rounded-3xl border border-slate-200 dark:border-slate-800
  bg-white dark:bg-slate-900 p-8 space-y-6"
>

            <h3 className="text-xl font-semibold mb-4">
              Send Us a Message
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="input input-bordered w-full bg-transparent"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="input input-bordered w-full bg-transparent"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              required
              className="input input-bordered w-full bg-transparent"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              required
              className="textarea textarea-bordered w-full bg-transparent"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500
              text-black font-semibold py-3 rounded-xl flex items-center
              justify-center gap-2"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
