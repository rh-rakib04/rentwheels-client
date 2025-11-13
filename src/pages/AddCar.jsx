import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { user, darkMode } = use(AuthContext); // Get darkMode from context

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      image: form.image.value,
      category: form.category.value,
      rentPrice: form.rentPrice.value,
      location: form.location.value,
      fuelType: form.fuelType.value,
      transmission: form.transmission.value,
      description: form.description.value,
      addBy: user.email,
    };

    fetch("http://localhost:5000/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.success) {
          toast.success("✅ Car added successfully!");
          form.reset();
        } else {
          toast.error("❌ Failed to add car. Try again!");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className={`w-11/12 md:w-8/12 lg:w-6/12 mx-auto my-12 p-8 rounded-2xl shadow-lg border transition-all duration-300 ${
        darkMode
          ? "bg-slate-900 border-slate-700 text-white"
          : "bg-white border-slate-200 text-gray-900"
      }`}
    >
      <h1
        data-aos="fade-up"
        className={`text-3xl font-bold text-center mb-6 ${
          darkMode ? "text-yellow-400" : "text-yellow-500"
        }`}
      >
        Add a New Car
      </h1>

      <form data-aos="fade-up" onSubmit={handleSubmit} className="space-y-5">
        {/* Car Name */}
        <div>
          <label
            className={`block mb-1 font-medium ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Car Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter car name"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-300 ${
              darkMode
                ? "border-slate-600 bg-slate-800 text-white focus:ring-yellow-400"
                : "border-slate-300 bg-slate-50 text-slate-800 focus:ring-yellow-500"
            }`}
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            className={`block mb-1 font-medium ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/car.jpg"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-300 ${
              darkMode
                ? "border-slate-600 bg-slate-800 text-white focus:ring-yellow-400"
                : "border-slate-300 bg-slate-50 text-slate-800 focus:ring-yellow-500"
            }`}
          />
        </div>

        {/* Category */}
        <div>
          <label
            className={`block mb-1 font-medium ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Category
          </label>
          <select
            name="category"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-300 ${
              darkMode
                ? "border-slate-600 bg-slate-800 text-white focus:ring-yellow-400"
                : "border-slate-300 bg-slate-50 text-slate-800 focus:ring-yellow-500"
            }`}
          >
            <option value="">Select category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Electric">Electric</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {/* Rent Price */}
        <div>
          <label
            className={`block mb-1 font-medium ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Rent Price (Per Day)
          </label>
          <input
            type="number"
            name="rentPrice"
            placeholder="e.g., 80"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-300 ${
              darkMode
                ? "border-slate-600 bg-slate-800 text-white focus:ring-yellow-400"
                : "border-slate-300 bg-slate-50 text-slate-800 focus:ring-yellow-500"
            }`}
          />
        </div>

        {/* Location */}
        <div>
          <label
            className={`block mb-1 font-medium ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="e.g., Chattogram, Bangladesh"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-300 ${
              darkMode
                ? "border-slate-600 bg-slate-800 text-white focus:ring-yellow-400"
                : "border-slate-300 bg-slate-50 text-slate-800 focus:ring-yellow-500"
            }`}
          />
        </div>

        {/* Fuel & Transmission */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label
              className={`block mb-1 font-medium ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Fuel Type
            </label>
            <select
              name="fuelType"
              required
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-300 ${
                darkMode
                  ? "border-slate-600 bg-slate-800 text-white focus:ring-yellow-400"
                  : "border-slate-300 bg-slate-50 text-slate-800 focus:ring-yellow-500"
              }`}
            >
              <option value="">Select fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="flex-1">
            <label
              className={`block mb-1 font-medium ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Transmission
            </label>
            <select
              name="transmission"
              required
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-300 ${
                darkMode
                  ? "border-slate-600 bg-slate-800 text-white focus:ring-yellow-400"
                  : "border-slate-300 bg-slate-50 text-slate-800 focus:ring-yellow-500"
              }`}
            >
              <option value="">Select transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            className={`block mb-1 font-medium ${
              darkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Write short description..."
            required
            rows="3"
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all duration-300 ${
              darkMode
                ? "border-slate-600 bg-slate-800 text-white focus:ring-yellow-400"
                : "border-slate-300 bg-slate-50 text-slate-800 focus:ring-yellow-500"
            }`}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-md"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
