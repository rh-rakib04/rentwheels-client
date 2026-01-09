import React, { useContext } from "react";
import {
  FaCarSide,
  FaHome,
  FaMoon,
  FaSun,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { IoCarSportOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser, darkMode, toggleDarkMode } =
    useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all
     ${
       isActive
         ? "text-yellow-400 font-semibold bg-yellow-400/10"
         : "hover:text-yellow-400 hover:bg-yellow-400/10"
     }`;

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all
      ${
        darkMode
          ? "bg-black/60 text-white border-white/10"
          : "bg-white/70 text-gray-900 border-black/10"
      }`}
    >
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT: LOGO */}
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-yellow-400"
          >
            <IoCarSportOutline size={26} />
            <span className="tracking-wide">RentWheels</span>
          </Link>
        </div>

        {/* CENTER: DESKTOP NAV */}
        <div className="navbar-center hidden lg:flex">
          <nav className="flex gap-1">
            <NavLink to="/" className={navLinkClass}>
              <FaHome /> Home
            </NavLink>
            <NavLink to="/browse-cars" className={navLinkClass}>
              <FaCarSide /> Browse Cars
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              <FaInfoCircle /> About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              <FaEnvelope /> Contact
            </NavLink>
          </nav>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="navbar-end gap-2">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleDarkMode}
            className="btn btn-ghost btn-circle text-yellow-400"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          {/* AUTH - DESKTOP */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-9 rounded-full ring ring-yellow-400 ring-offset-2 ring-offset-base-100">
                    <img src={user.photoURL} alt="user" />
                  </div>
                </div>
                <ul className="menu dropdown-content mt-3 w-56 rounded-xl bg-base-100 shadow-lg">
                  <li className="font-semibold">{user.displayName}</li>
                  <li className="text-xs opacity-70">{user.email}</li>
                  <li>
                    <button
                      onClick={signOutUser}
                      className="btn btn-sm btn-warning mt-2"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/auth/login" className="btn btn-sm btn-warning">
                  Login
                </Link>
                <Link to="/auth/register" className="btn btn-sm btn-outline btn-warning">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} className="btn btn-ghost">
              <RiMenu2Fill size={22} />
            </div>

            <ul
              tabIndex={0}
              className={`menu dropdown-content mt-3 w-64 rounded-xl shadow-lg backdrop-blur-xl
              ${
                darkMode
                  ? "bg-slate-900/95 text-white"
                  : "bg-white/95 text-gray-900"
              }`}
            >
              <NavLink to="/" className={navLinkClass}>
                <FaHome /> Home
              </NavLink>
              <NavLink to="/browse-cars" className={navLinkClass}>
                <FaCarSide /> Browse Cars
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                <FaInfoCircle /> About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                <FaEnvelope /> Contact
              </NavLink>

              <li className="mt-2">
                <button onClick={toggleDarkMode} className="flex gap-2">
                  {darkMode ? <FaSun /> : <FaMoon />}
                  Toggle Theme
                </button>
              </li>

              {user ? (
                <>
                  <li className="font-semibold mt-2">{user.displayName}</li>
                  <li className="text-xs opacity-70">{user.email}</li>
                  <li>
                    <button
                      onClick={signOutUser}
                      className="btn btn-sm btn-warning mt-2"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="btn btn-sm btn-warning mt-2">
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    Register
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
