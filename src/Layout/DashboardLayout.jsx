import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Dashboard/Sidebar";
import Topbar from "../components/Dashboard/Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen  transition-colors duration-500 overflow-hidden">
      
      {/* 🏎️ ENGINE ROOM: Background Ambient Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-yellow-500/[0.03] dark:bg-yellow-500/[0.02] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-yellow-600/[0.02] dark:bg-yellow-600/[0.01] blur-[100px] rounded-full" />
        {/* Subtle grid pattern for that "Tech" look */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
      />

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOPBAR Component */}
        <Topbar 
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ">
          <div className="p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto">
            {/* Smooth transition for route changes */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>

      {/* Global CSS for scrollbars (Add this to your index.css or a style tag) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(155, 155, 155, 0.1);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #eab308;
        }
      `}} />
    </div>
  );
};

export default DashboardLayout;