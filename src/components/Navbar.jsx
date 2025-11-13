import React, { useContext } from "react";
import {
  FaBookmark,
  FaCarSide,
  FaHome,
  FaListAlt,
  FaPlusCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { IoCarSportOutline, IoLogIn, IoLogOut } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // Get auth + theme state from AuthContext
  const { user, signOutUser, darkMode, toggleDarkMode } =
    useContext(AuthContext);

  const links = (
    <>
      <NavLink className="p-3 flex gap-1 items-center" to="/">
        <FaHome /> Home
      </NavLink>
      <NavLink className="p-3 flex gap-1 items-center" to="/add-car">
        <FaPlusCircle /> Add Car
      </NavLink>
      <NavLink className="p-3 flex gap-1 items-center" to="/my-listings">
        <FaListAlt /> My Listings
      </NavLink>
      <NavLink className="p-3 flex gap-1 items-center" to="/my-bookings">
        <FaBookmark /> My Bookings
      </NavLink>
      <NavLink className="p-3 flex gap-1 items-center" to="/browse-cars">
        <FaCarSide /> Browse Cars
      </NavLink>
    </>
  );

  return (
    <div
      className={`navbar shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className={`menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow transition-colors duration-300 ${
              darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className={`btn btn-ghost text-xl flex items-center gap-2 ${
            darkMode ? "text-yellow-400" : "text-yellow-500"
          }`}
        >
          <IoCarSportOutline /> RentWheels
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`btn btn-ghost btn-circle text-xl transition-colors duration-300 ${
            darkMode ? "text-yellow-400" : "text-yellow-500"
          }`}
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* User Login / Avatar */}
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="user avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className={`menu menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 shadow transition-colors duration-300 ${
                darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <div className="pb-3 border-b border-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-xs text-left bg-yellow-500 hover:bg-yellow-400 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/auth/login"
              className="btn rounded-full btn-sm bg-yellow-500 hover:bg-yellow-400 text-white"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="btn rounded-full btn-sm bg-yellow-500 hover:bg-yellow-400 text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
