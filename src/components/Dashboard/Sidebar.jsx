import { NavLink } from "react-router-dom";
import { FaCar, FaChartPie, FaUser, FaList } from "react-icons/fa";

const Sidebar = () => {
  const role = "admin"; // or "user"

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:block">
      <div className="p-6 font-black text-xl text-yellow-500">
        RentWheels
      </div>

      <nav className="space-y-2 px-4">
        <NavItem to="/dashboard" icon={<FaChartPie />} label="Overview" />
        <NavItem to="/dashboard/my-bookings" icon={<FaList />} label="My Bookings" />

        {role === "admin" && (
          <NavItem to="/dashboard//add-car" icon={<FaCar />} label="Add Cars" />
        )}

        <NavItem to="/dashboard/profile" icon={<FaUser />} label="Profile" />
      </nav>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-3 rounded-xl transition ${
        isActive
          ? "bg-yellow-500 text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
