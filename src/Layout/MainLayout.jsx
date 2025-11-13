import React, { use } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { darkMode } = use(AuthContext); // Get darkMode from context

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen transition-colors duration-500`}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
