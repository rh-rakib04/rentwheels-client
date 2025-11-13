import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaTrash, FaEdit, FaCarSide, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user, darkMode } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null); // for update modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove this car?",
      text: "This action cannot be undone!",
      icon: "warning",
      background: "#0f172a",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#facc15",
      cancelButtonColor: "#475569",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl shadow-lg border border-slate-700",
        confirmButton: "rounded-lg font-semibold px-5 py-2",
        cancelButton: "rounded-lg font-semibold px-5 py-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/cars/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: "The car has been successfully removed.",
              icon: "success",
              background: "#0f172a",
              color: "#fff",
              confirmButtonColor: "#facc15",
            });
            setMyCars((prevCars) => prevCars.filter((car) => car._id !== id));
          });
      }
    });
  };

  // Open modal
  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  // Handle update form submit
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCar = {
      name: form.name.value,
      category: form.category.value,
      rentPrice: form.rentPrice.value,
      image: form.image.value,
      location: form.location.value,
    };

    fetch(`http://localhost:5000/cars/${selectedCar._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully updated!");
        setMyCars((prevCars) =>
          prevCars.map((car) =>
            car._id === selectedCar._id ? { ...car, ...updatedCar } : car
          )
        );
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <h1
            data-aos="fade-up"
            className="text-4xl font-extrabold flex justify-center items-center gap-3"
          >
            <FaCarSide
              className={`text-4xl ${
                darkMode ? "text-yellow-400" : "text-yellow-600"
              }`}
            />{" "}
            My Listings
          </h1>
          <p
            data-aos="fade-down"
            className={darkMode ? "text-gray-400" : "text-gray-600"}
          >
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
                        onClick={() => openModal(car)}
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

      {/* 🟡 Update Modal */}
      {isModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div
            className={`p-6 rounded-xl shadow-2xl w-full max-w-lg mx-2 ${
              darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">
              Update Car Info
            </h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="name"
                defaultValue={selectedCar.name}
                placeholder="Car Name"
                className="w-full border rounded-md px-3 py-2"
                required
              />
              <input
                name="category"
                defaultValue={selectedCar.category}
                placeholder="Category"
                className="w-full border rounded-md px-3 py-2"
                required
              />
              <input
                name="rentPrice"
                type="number"
                defaultValue={selectedCar.rentPrice}
                placeholder="Rent Price per day"
                className="w-full border rounded-md px-3 py-2"
                required
              />
              <input
                name="location"
                defaultValue={selectedCar.location}
                placeholder="Location"
                className="w-full border rounded-md px-3 py-2"
                required
              />
              <input
                name="image"
                defaultValue={selectedCar.image}
                placeholder="Image URL"
                className="w-full border rounded-md px-3 py-2"
                required
              />
              <input
                defaultValue={user.displayName}
                placeholder="Provider Name"
                className="w-full border rounded-md px-3 py-2"
                readOnly
              />
              <input
                defaultValue={user.email}
                placeholder="Provider Email"
                className="w-full border rounded-md px-3 py-2"
                readOnly
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md font-semibold bg-gray-500 hover:bg-gray-600 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md font-semibold bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
