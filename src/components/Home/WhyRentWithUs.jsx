import React from "react";
import {
  FaHandshake,
  FaCarAlt,
  FaMoneyBillWave,
  FaHeadset,
  FaLightbulb,
} from "react-icons/fa";

const WhyRentWithUs = () => {
  const features = [
    {
      id: 1,
      title: "Wide Car Selection",
      desc: "Choose from economy to luxury — we’ve got cars for every need and budget.",
      icon: <FaCarAlt />,
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      id: 2,
      title: "Best Price Guarantee",
      desc: "We offer the most affordable rental prices without compromising quality.",
      icon: <FaMoneyBillWave />,
      color: "bg-green-500/10 text-green-500",
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      desc: "Our friendly support team is always here to help you on the road.",
      icon: <FaHeadset />,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      id: 4,
      title: "Trusted by Thousands",
      desc: "Thousands of happy customers rely on RentWheels for their trips.",
      icon: <FaHandshake />,
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-20 text-center">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-yellow-500 dark:text-yellow-400">
          <FaLightbulb className="text-yellow-500 dark:text-yellow-400" /> Why
          Rent With Us
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base max-w-2xl mx-auto">
          Experience hassle-free car rentals with unbeatable prices and trusted
          service.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.id}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div
              className={`text-4xl mb-4 p-4 rounded-full ${f.color} group-hover:scale-110 transition-transform duration-300`}
            >
              {f.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-100">
              {f.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyRentWithUs;
