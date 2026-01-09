import React, { use, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Context & Components
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarIntroLottie from "../components/CarIntroLottie";

const MainLayout = () => {
  // Accessing Auth Context (React 19 style)
  const auth = use(AuthContext);
  const darkMode = auth?.darkMode;
  
  const location = useLocation();
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 100,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  // Refresh AOS on route change
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"} min-h-screen transition-colors duration-500`}>
      
      {/* 1. The Loader Overlay */}
      <CarIntroLottie 
        show={isAppLoading} 
        onFinished={() => setIsAppLoading(false)} 
      />

      {/* 2. The Main Website Content */}
      {/* We keep the content hidden until loading is done to prevent "flashing" background items */}
      <AnimatePresence>
        {!isAppLoading && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Navbar />
            <main className="min-h-[calc(100vh-200px)]">
              <Outlet />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;