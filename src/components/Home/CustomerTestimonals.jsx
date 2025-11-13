import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    photo: "https://i.ibb.co/mD4S5j8/profile1.jpg",
    review:
      "RentWheels made my weekend trip absolutely seamless. The booking was quick, the car was spotless, and support was fantastic!",
    rating: 5,
  },
  {
    id: 2,
    name: "Md. Arif Hossain",
    photo: "https://i.ibb.co/d54D9Kn/profile2.jpg",
    review:
      "Super easy to rent and return. I love how transparent the pricing is. Definitely my go-to for any future trips!",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Sarah Islam",
    photo: "https://i.ibb.co/5GFWbpc/profile3.jpg",
    review:
      "From booking to drop-off, everything was effortless. Customer service was quick and polite. Highly recommended!",
    rating: 5,
  },
];

const CustomerTestimonials = () => {
  return (
    <section className="w-11/12 mx-auto my-20 text-center">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-yellow-500 dark:text-yellow-400">
          <FaQuoteLeft className="text-yellow-500 dark:text-yellow-400" />
          What Our Customers Say
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base max-w-xl mx-auto">
          Real experiences from our trusted RentWheels users — here’s why they
          keep coming back!
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {testimonial.name}
                </h3>
                <div className="flex text-yellow-500">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <FaStar className="opacity-50" />
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic text-sm leading-relaxed">
              “{testimonial.review}”
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button className="bg-yellow-500 text-white dark:text-black px-8 py-2 rounded-full font-semibold hover:bg-yellow-400 dark:hover:bg-yellow-300 shadow-md transition-all duration-300">
          Share Your Experience
        </button>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
