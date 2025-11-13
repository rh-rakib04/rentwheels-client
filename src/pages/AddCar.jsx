import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { user } = use(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      image: e.target.image.value,
      category: e.target.category.value,
      rentPrice: e.target.rentPrice.value,
      location: e.target.location.value,
      fuelType: e.target.fuelType.value,
      transmission: e.target.transmission.value,
      description: e.target.description.value,
      addBy: user.email,
    };
    console.log(formData);

    fetch("http://localhost:5000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.insertedId || data.success) {
          toast.success("✅ Car added successfully!");
          form.reset(); // Reset the form
        } else {
          toast.error("❌ Failed to add car. Try again!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto my-12 p-8 rounded-2xl shadow-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 transition-all duration-300">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-500 dark:text-yellow-400">
        Add a New Car
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Car Name */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
            Car Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter car name"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/car.jpg"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
            Category
          </label>
          <select
            name="category"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
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
          <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
            Rent Price (Per Day)
          </label>
          <input
            type="number"
            name="rentPrice"
            placeholder="e.g., 80"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="e.g., Chattogram, Bangladesh"
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
          />
        </div>

        {/* Fuel Type & Transmission */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
              Fuel Type
            </label>
            <select
              name="fuelType"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
              Transmission
            </label>
            <select
              name="transmission"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
            >
              <option value="">Select transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 mb-1 font-medium">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Write short description..."
            required
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
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
