import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

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
  {
    id: 4,
    name: "Rafiq Khan",
    photo: "https://i.ibb.co/3fhC5pF/profile4.jpg",
    review:
      "Amazing experience! Cars are well-maintained and the booking process is super smooth.",
    rating: 5,
  },
];

const CustomerTestimonials = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 5,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.review) {
      toast.error("Please fill in all fields!");
      return;
    }
    testimonials.push({
      id: testimonials.length + 1,
      name: formData.name,
      photo: "https://i.ibb.co/5GFWbpc/profile3.jpg",
      review: formData.review,
      rating: parseFloat(formData.rating),
    });
    toast.success("Thank you for sharing your experience!");
    setFormData({ name: "", review: "", rating: 5 });
    setShowForm(false);
  };

  return (
    <section className="w-11/12 mx-auto my-20 text-center relative overflow-hidden">
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

      {/* Marquee Scroll */}
      <motion.div
        className="flex gap-6 w-full"
        style={{ display: "flex", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-left"
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
          </div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-500 text-white dark:text-black px-8 py-2 rounded-full font-semibold hover:bg-yellow-400 dark:hover:bg-yellow-300 shadow-md transition-all duration-300"
        >
          Share Your Experience
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-11/12 md:w-1/2 shadow-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 font-bold text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-yellow-500 dark:text-yellow-400">
              Share Your Experience
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-yellow-400 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  Review
                </label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-yellow-400 focus:outline-none"
                  rows="4"
                  placeholder="Write your experience..."
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
                  Rating
                </label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-yellow-400 focus:outline-none"
                  required
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-black font-semibold rounded-lg transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerTestimonials;
