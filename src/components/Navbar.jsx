import React, { use } from "react";
import {
  FaBookmark,
  FaCarSide,
  FaHome,
  FaListAlt,
  FaPlusCircle,
} from "react-icons/fa";
import { IoCarSportOutline, IoLogIn, IoLogOut } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const links = (
    <>
      <NavLink className="p-3 flex gap-1 items-center" to="/">
        <FaHome />
        Home
      </NavLink>
      <NavLink className="p-3 flex gap-1 items-center" to="/add-car">
        <FaPlusCircle />
        Add Car
      </NavLink>
      <NavLink className="p-3 flex gap-1 items-center" to="/my-listings">
        <FaListAlt />
        My Listings
      </NavLink>
      <NavLink className="p-3 flex gap-1 items-center" to="/my-bookings">
        <FaBookmark />
        My Bookings
      </NavLink>
      <NavLink className="p-3 flex gap-1 items-center" to="/browser-cars">
        <FaCarSide />
        Browser Cars
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm ">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-yellow-500 ">
          <IoCarSportOutline />
          RentWheels
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {/* <div className="navbar-end">
        <Link to="/login" className="btn">
          SignIn
        </Link>
        <Link to="/register" className="btn">
          SignUp
        </Link>
      </div> */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
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
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
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
          <div>
            <Link
              to="/auth/login"
              className="btn rounded-full border-gray-300  btn-sm bg-yellow-500 hover:bg-yellow-400 text-white"
            >
              {" "}
              <IoLogIn /> Login
            </Link>
            <Link
              to="/auth/register"
              className="btn rounded-full border-gray-300  btn-sm bg-yellow-500 hover:bg-yellow-400 text-white"
            >
              {" "}
              <IoLogIn /> Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
