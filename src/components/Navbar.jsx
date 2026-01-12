import { useContext } from "react";
import {
  FaCarSide,
  FaHome,
  FaMoon,
  FaSun,
  FaInfoCircle,
  FaEnvelope,
  FaTachometerAlt,
  FaUser,
  FaSignOutAlt,
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
        <Link to="/" className="flex items-center navbar-start ">
          <div className="p-1.5 rounded-xl bg-yellow-500 text-black shadow-lg shadow-yellow-500/20">
            <IoCarSportOutline size={26} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter italic leading-none  uppercase">
              Rent<span className="text-yellow-500">Wheels</span>
            </span>
          </div>
        </Link>

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
            {user && (
              <NavLink to="/dashboard" className={navLinkClass}>
                <FaTachometerAlt /> Dashboard
              </NavLink>
            )}
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
                <div
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-all duration-200"
                >
                  <div className="w-9 rounded-full ring-2 ring-yellow-400 ring-offset-2 ring-offset-white dark:ring-offset-black shadow-lg">
                    <img
                      src={
                        user.photoURL || "https://i.ibb.co/5GFWbpc/profile3.jpg"
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <ul
                  className={`menu dropdown-content mt-3 w-64 rounded-2xl shadow-2xl border backdrop-blur-xl z-50 overflow-hidden ${
                    darkMode
                      ? "bg-black/95 border-yellow-400/20 "
                      : "bg-white/95 border-yellow-200/30"
                  }`}
                >
                  {/* Profile Header */}
                  <li
                    className={`px-2 py-1 border-b ${
                      darkMode ? "border-yellow-400/20" : "border-yellow-200/30"
                    } `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full ring-2 ring-yellow-400 ring-offset-2 ring-offset-white dark:ring-offset-black">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/5GFWbpc/profile3.jpg"
                          }
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold  truncate">
                          {user.displayName || "User"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </span>
                  </li>

                  {/* Menu Items */}
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className={`flex items-center gap-3 px-4 py-3 font-medium transition-all duration-200 ${
                        darkMode
                          ? "text-slate-300 hover:bg-yellow-900/20 hover:text-yellow-400"
                          : "text-slate-700 hover:bg-yellow-50 hover:text-yellow-600"
                      }`}
                    >
                      <FaUser size={14} />
                      Profile Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={signOutUser}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left font-medium transition-all duration-200 hover:text-red-700"
                    >
                      <FaSignOutAlt size={14} />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/auth/login" className="btn btn-sm btn-warning">
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
          </div>

          {/* MOBILE MENU */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} className="btn btn-ghost">
              <RiMenu2Fill size={22} />
            </div>

            <ul
              tabIndex={0}
              className={`menu dropdown-content mt-3 w-64 rounded-xl shadow-lg backdrop-blur-xl border ${
                darkMode
                  ? "bg-black/95 text-white border-yellow-400/20"
                  : "bg-white/95 text-gray-900 border-yellow-200/30"
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
              {user && (
                <NavLink to="/dashboard" className={navLinkClass}>
                  <FaTachometerAlt /> Dashboard
                </NavLink>
              )}

              <li className="mt-2">
                <button
                  onClick={toggleDarkMode}
                  className={`flex gap-2 transition-all duration-200 ${
                    darkMode
                      ? "hover:bg-yellow-900/20 hover:text-yellow-400"
                      : "hover:bg-yellow-50 hover:text-yellow-600"
                  }`}
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                  Toggle Theme
                </button>
              </li>

              {user ? (
                <>
                  <div
                    className={`h-px my-2 ${
                      darkMode ? "bg-yellow-400/20" : "bg-yellow-200/30"
                    }`}
                  />

                  {/* User Info */}
                  <li
                    className={`px-4 py-2 ${
                      darkMode ? "bg-yellow-900/10" : "bg-yellow-50/50"
                    } rounded-lg mx-2 mb-2`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full ring-2 ring-yellow-400 ring-offset-2 ring-offset-white dark:ring-offset-black">
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/5GFWbpc/profile3.jpg"
                          }
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm truncate">
                          {user.displayName || "User"}
                        </span>
                        <span className="text-xs opacity-70 truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </li>

                  {/* Profile Actions */}
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className={`flex items-center gap-2 transition-all duration-200 ${
                        darkMode
                          ? "hover:bg-yellow-900/20 hover:text-yellow-400"
                          : "hover:bg-yellow-50 hover:text-yellow-600"
                      }`}
                    >
                      <FaUser size={14} />
                      Profile Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={signOutUser}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-all duration-200"
                    >
                      <FaSignOutAlt size={14} />
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <div
                    className={`h-px my-2 ${
                      darkMode ? "bg-yellow-400/20" : "bg-yellow-200/30"
                    }`}
                  />
                  <li>
                    <Link to="/auth/login" className="btn btn-sm btn-warning">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth/register"
                      className="btn btn-sm btn-outline btn-warning"
                    >
                      Register
                    </Link>
                  </li>
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
