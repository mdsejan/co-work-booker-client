import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

interface NavbarProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const controls = useAnimation();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    controls.start(
      isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
    );
  }, [isOpen, controls]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = (
    <>
      <Link
        to="/"
        className={`block ${
          location.pathname === "/"
            ? "text-blue-500 font-bold"
            : "text-gray-500"
        } hover:text-gray-900`}
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        to="/meeting-rooms"
        className={`block ${
          location.pathname === "/meeting-rooms"
            ? "text-blue-500 font-bold"
            : "text-gray-500"
        } hover:text-gray-900`}
        onClick={closeMenu}
      >
        Meeting Rooms
      </Link>
      <Link
        to="/about-us"
        className={`block ${
          location.pathname === "/about-us"
            ? "text-blue-500 font-bold"
            : "text-gray-500"
        } hover:text-gray-900`}
        onClick={closeMenu}
      >
        About Us
      </Link>
      <Link
        to="/contact-us"
        className={`block ${
          location.pathname === "/contact-us"
            ? "text-blue-500 font-bold"
            : "text-gray-500"
        } hover:text-gray-900`}
        onClick={closeMenu}
      >
        Contact Us
      </Link>
    </>
  );

  return (
    <nav className="bg-white border-b">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-xl font-bold text-gray-800 hover:text-gray-600"
              >
                CoWorkBooker
              </Link>
            </div>
            <div className="hidden md:flex space-x-8 ml-10">{navLinks}</div>
          </div>

          {/* User and Menu Icons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  className="flex items-center text-gray-600 hover:text-gray-800"
                  onClick={toggleDropdown}
                >
                  <FaUserCircle size={24} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                    {isAdmin ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/my-bookings"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          My Bookings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white bg-violet-800 rounded-full px-4 py-2"
              >
                Login/Register
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <div className="md:hidden ml-4">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                {isOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed top-16 left-0 w-full bg-white border-t shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, height: 0 }}
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{navLinks}</div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
