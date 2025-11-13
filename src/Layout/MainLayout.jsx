import React, { use, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {
  const { darkMode } = use(AuthContext); // Get darkMode from context
  const location = useLocation();

  // 🌟 Initialize AOS globally
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  // 🔄 Refresh AOS on every route change
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);
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
