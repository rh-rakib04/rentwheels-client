import { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaBars,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaChevronDown,
  FaUser,
  FaCogs,
} from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { IoHome, IoShieldCheckmark } from "react-icons/io5";
import useRole from "../../hooks/useRole";

const Topbar = ({ onToggleSidebar }) => {
  const { user, signOutUser, toggleDarkMode, darkMode } =
    useContext(AuthContext);
    const { role } = useRole();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`h-24 sticky top-0 border-b flex items-center justify-between px-4 md:px-8 z-[50] transition-all duration-500 backdrop-blur-md ${
        darkMode ? "bg-black/60 border-white/5" : "bg-white/80 border-slate-200"
      }`}
    >
      {/* --- LEFT SECTION: CONTROL & IDENTITY --- */}
      <div className="flex items-center gap-2 md:gap-6">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-3 rounded-xl hover:bg-yellow-500 hover:text-black transition-all active:scale-90"
        >
          <FaBars size={18} />
        </button>

        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none">
            Welcome,{" "}
            <span className="text-yellow-500">
              {user?.displayName?.split(" ")[0] || "Commander"}
            </span>
          </h1>
        </div>
      </div>

      {/* --- RIGHT SECTION: NAVIGATION & PROFILE --- */}
      <div className="flex items-center gap-1 md:gap-4">
        {/* Home Button (Hidden text on small mobile) */}
        <Link
          to="/"
          className={`flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 ${
            darkMode
              ? "border-white/5 bg-white/5 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
              : "border-slate-100 bg-slate-50 text-slate-700 hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
          }`}
        >
          <IoHome className="text-base" />
          <span className="hidden sm:inline">Return Home</span>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-xl transition-all active:rotate-45 ${
            darkMode
              ? "text-yellow-400 hover:bg-white/5"
              : "text-zinc-400 hover:bg-slate-100"
          }`}
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-zinc-500/20 mx-1 hidden md:block" />

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="flex items-center gap-2 cursor-pointer group p-1 rounded-2xl transition-all"
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden ring-2 ring-yellow-500/20 group-hover:ring-yellow-500 transition-all shadow-2xl">
                <img
                  src={
                    user?.photoURL || "https://i.ibb.co/5GFWbpc/profile3.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online Indicator Dot */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-black rounded-full" />
            </div>
            <FaChevronDown className="text-zinc-500 text-[8px] group-hover:text-yellow-500 transition-colors hidden sm:block" />
          </div>

          {/* DROPDOWN MENU */}
          <ul
            tabIndex={0}
            className={`mt-4 p-3 shadow-2xl menu dropdown-content rounded-[2rem] w-70 border z-[100] ${
              darkMode
                ? "bg-zinc-950 border-white/10 text-white"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <div className="px-4 py-3 mb-2">
              
              <p className="text-xs font-bold  italic">
                {user?.displayName}
              </p>
              <p className="text-xs font-bold  italic">
                {user?.role}
              </p>
              <p className="text-xs font-bold  italic">
                {user?.email}
              </p>
            </div>

            <li className="group">
              <Link
                to="/dashboard/profile"
                className="p-3 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] italic flex items-center gap-3 hover:bg-yellow-500 hover:text-black transition-all"
              >
                <FaUser className="group-hover:scale-110 transition-transform" />{" "}
                Account Profile
              </Link>
            </li>
       
            <div className="h-[1px] bg-zinc-500/10 my-2 mx-3" />

            <li>
              <button
                onClick={signOutUser}
                className="p-3 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] italic text-red-500 flex items-center gap-3 hover:bg-red-500 hover:text-white transition-all"
              >
                <FaSignOutAlt /> Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;
