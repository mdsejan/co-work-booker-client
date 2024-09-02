import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      {/* 404 Error Message */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-extrabold text-[#2499EF] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link to="/" className="group">
          <motion.button
            className="bg-[#14141E] text-white px-6 py-3 rounded-full flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FiArrowLeft className="text-white" />
            Home
          </motion.button>
        </Link>
        <Link to="/login" className="group">
          <motion.button
            className="bg-[#2499EF] text-white px-6 py-3 rounded-full flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Login
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
