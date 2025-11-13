import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaTrash, FaEdit, FaCarSide, FaSpinner } from "react-icons/fa";

const MyListings = () => {
  const { user, darkMode } = useContext(AuthContext); // Get darkMode from context
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's cars
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/cars?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyCars(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Delete a car
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    const res = await fetch(`http://localhost:5000/cars/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMyCars(myCars.filter((car) => car._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-yellow-500 text-xl">
        <FaSpinner className="animate-spin mr-2" /> Loading your listings...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold flex justify-center items-center gap-3">
            <FaCarSide
              className={`text-4xl ${
                darkMode ? "text-yellow-400" : "text-yellow-600"
              }`}
            />{" "}
            My Listings
          </h1>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Manage all your listed cars — update details or remove them anytime.
          </p>
        </div>

        {/* No Cars */}
        {myCars.length === 0 ? (
          <div className="text-center py-20">
            🚗 You haven’t added any cars yet.
            <a
              href="/add-car"
              className={`ml-2 underline ${
                darkMode
                  ? "text-yellow-400 hover:text-yellow-300"
                  : "text-yellow-600 hover:text-yellow-500"
              }`}
            >
              Add your first car
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              className={`min-w-full border rounded-2xl overflow-hidden transition-colors duration-500 ${
                darkMode ? "border-slate-700" : "border-gray-300"
              }`}
            >
              <thead
                className={
                  darkMode
                    ? "bg-slate-800 text-yellow-400"
                    : "bg-gray-200 text-yellow-600"
                }
              >
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Car Name</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myCars.map((car) => (
                  <tr
                    key={car._id}
                    className={`border-b transition-colors duration-300 ${
                      darkMode
                        ? "border-slate-800 hover:bg-slate-800/40"
                        : "border-gray-300 hover:bg-gray-200/40"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-16 h-10 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold">{car.name}</td>
                    <td className="px-4 py-3">{car.category}</td>
                    <td className="px-4 py-3">${car.rentPrice}/day</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          car.status === "Booked"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-green-500/20 text-green-500"
                        }`}
                      >
                        {car.status || "Available"}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-2 flex-wrap">
                      <button
                        className={`px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-1 transition ${
                          darkMode
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                        }`}
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
