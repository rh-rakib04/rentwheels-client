import React from "react";
import { motion } from "framer-motion";
import {
  FaCarSide,
  FaUsers,
  FaShieldAlt,
  FaLayerGroup,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-base-900 ">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase  tracking-tighter italic mb-4"
          >
            About <span className="text-yellow-500">RentWheels</span>
          </motion.h1>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
            A modern full-stack car rental platform built to demonstrate
            real-world development skills, clean UI design, and secure backend
            integration.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Project Overview
            </h2>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              RentWheels is designed as a production-style car rental
              application where users can browse vehicles, view detailed
              listings, book cars, and manage their bookings securely.
              <br /><br />
              The project focuses on scalability, authentication, role-based
              features, and a consistent user experience across all devices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 "
          >
            {[
              {
                icon: <FaCarSide />,
                title: "Vehicle Listings",
                desc: "Browse, view & book cars",
              },
              {
                icon: <FaUsers />,
                title: "User Dashboard",
                desc: "Bookings & personal listings",
              },
              {
                icon: <FaShieldAlt />,
                title: "Secure Auth",
                desc: "Firebase authentication",
              },
              {
                icon: <FaLayerGroup />,
                title: "Full-Stack",
                desc: "React, Node, MongoDB",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-800
                bg-base dark:bg-base-900 p-6
                hover:border-yellow-500 transition"
              >
                <div className="text-yellow-500 text-2xl mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-1 text-yellow-500">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-base-50 dark:bg-base-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-semibold mb-10">
            Technology Stack
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "React Router",
              "Tailwind CSS",
              "DaisyUI",
              "Firebase Auth",
              "Node.js",
              "Express.js",
              "MongoDB",
            ].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2 rounded-full text-sm font-medium
                border border-slate-300 dark:border-slate-700
                bg-base-900
                hover:border-yellow-500 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200 dark:border-slate-800
          bg-gradient-to-br from-yellow-400/10 to-transparent
          p-14 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore RentWheels?
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            This project showcases practical full-stack skills, clean UI design,
            and production-ready architecture suitable for portfolio and academic
            evaluation.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/browse-cars"
              className="bg-yellow-400 hover:bg-yellow-500
              text-black font-semibold px-8 py-3 rounded-xl"
            >
              Browse Cars
            </a>
            <a
              href="/"
              className="border border-yellow-500 text-yellow-500
              hover:bg-yellow-500 hover:text-black
              font-semibold px-8 py-3 rounded-xl transition"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
