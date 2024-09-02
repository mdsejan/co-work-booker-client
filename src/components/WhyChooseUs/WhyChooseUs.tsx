import React from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaLock,
  FaCalendarCheck,
  FaPhone,
} from "react-icons/fa";

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#EEE6F4] rounded-full px-6 py-2">
            <h2 className="text-3xl font-extrabold text-[#663593]">
              Why Choose Us?
            </h2>
          </div>
          <p className="text-xl text-gray-800 mt-4">
            Discover the advantages of our meeting room booking system.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Seamless Booking Experience */}
          <motion.div
            className="bg-white p-6 border border-gray-200 rounded-lg"
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4">
              <FaCalendarCheck size={32} className="text-[#2499EF]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Seamless Booking Experience
            </h3>
            <p className="text-gray-600">
              Our system ensures an effortless booking process, allowing you to
              reserve your meeting room quickly and easily, with real-time
              availability.
            </p>
          </motion.div>

          {/* Secure Transactions */}
          <motion.div
            className="bg-white p-6 border border-gray-200 rounded-lg"
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4">
              <FaLock size={32} className="text-[#2499EF]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure Transactions
            </h3>
            <p className="text-gray-600">
              We prioritize the security of your transactions. Our system uses
              advanced encryption to protect your payment information and ensure
              a safe and secure booking process.
            </p>
          </motion.div>

          {/* 24/7 Customer Support */}
          <motion.div
            className="bg-white p-6 border border-gray-200 rounded-lg"
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4">
              <FaPhone size={32} className="text-[#2499EF]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              24/7 Customer Support
            </h3>
            <p className="text-gray-600">
              Our dedicated support team is available around the clock to assist
              you with any queries or issues, ensuring a smooth and hassle-free
              experience.
            </p>
          </motion.div>

          {/* User-Friendly Interface */}
          <motion.div
            className="bg-white p-6 border border-gray-200 rounded-lg"
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4">
              <FaCheckCircle size={32} className="text-[#2499EF]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              User-Friendly Interface
            </h3>
            <p className="text-gray-600">
              Our platform features an intuitive design, making it easy for
              users to navigate, book rooms, and manage their reservations
              effortlessly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
