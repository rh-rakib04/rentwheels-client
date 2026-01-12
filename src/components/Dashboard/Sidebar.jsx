import { NavLink } from "react-router";
import {
  FaCar,
  FaChartPie,
  FaUser,
  FaList,
  FaPlus,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import useRole from "../../hooks/useRole";

const Sidebar = ({ isOpen, onClose }) => {
  const { role } = useRole();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72  border-r border-yellow-200 transition-colors duration-500">
        <SidebarContent role={role} onClose={onClose} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[100] w-72 bg-white dark:bg-[#080808] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent role={role} onClose={onClose} showCloseButton />
      </aside>
    </>
  );
};

const SidebarContent = ({ role, onClose, showCloseButton }) => (
  <div className="flex flex-col h-full overflow-hidden">
    {/* Brand Header */}
    <div className="p-8 mb-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-yellow-500 text-black shadow-lg shadow-yellow-500/20">
            <IoCarSportOutline size={26} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter italic leading-none  uppercase">
              Rent<span className="text-yellow-500">Wheels</span>
            </span>
          </div>
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/10 hover:text-red-500 transition-colors rounded-lg"
          >
            <FaTimes size={20} />
          </button>
        )}
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
      <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 italic">
        Main Menu
      </p>

      <NavItem
        to="/dashboard"
        icon={<FaChartPie />}
        label="Overview"
        onClick={onClose}
      />
      <NavItem
        to="/dashboard/my-bookings"
        icon={<FaList />}
        label="My Bookings"
        onClick={onClose}
      />
      {role === "admin" && (
        <NavItem
          to="/dashboard/all-cars"
          icon={<FaCar />}
          label="All Cars"
          onClick={onClose}
        />
      )}
      <NavItem
        to="/dashboard/payment-history"
        icon={<FaShieldAlt />}
        label="Payment History"
        onClick={onClose}
      />
      <NavItem
        to="/dashboard/my-listings"
        icon={<FaCar />}
        label="My Listings"
        onClick={onClose}
      />

      {role === "user" ||
        (role === "admin" && (
          <>
            <NavItem
              to="/dashboard/add-car"
              icon={<FaPlus />}
              label="Deploy New Car"
              onClick={onClose}
            />
          </>
        ))}
    </nav>

    {/* Profile Nav (Bottom) */}
    <div className="p-4 mt-auto border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
      <NavItem
        to="/dashboard/profile"
        icon={<FaUser />}
        label="Account Settings"
        onClick={onClose}
      />
    </div>
  </div>
);

const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    end={to === "/dashboard"}
    className={({ isActive }) =>
      `group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative ${
        isActive
          ? "bg-yellow-500 text-black shadow-xl shadow-yellow-500/20"
          : "text-slate-500 dark:text-zinc-500 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-500/5"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`text-lg transition-transform duration-500 ${
            isActive ? "scale-110" : "group-hover:scale-110"
          }`}
        >
          {icon}
        </span>
        <span className="font-black italic uppercase tracking-tighter text-sm">
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="ml-auto w-1.5 h-1.5 rounded-full bg-black/40"
          />
        )}
      </>
    )}
  </NavLink>
);

export default Sidebar;
