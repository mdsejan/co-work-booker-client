import React from "react";
import {
  FaClock,
  FaCalendarCheck,
  FaCalendarAlt,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ServiceAdvertisement: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#EEE6F4] rounded-full px-6 py-2">
            <h2 className="text-3xl font-extrabold text-[#663593]">
              STREAMLINE SERVICES
            </h2>
          </div>
          <p className="text-xl text-gray-800 mt-4">
            We Provide Tailored Services to Improve Your Experience!
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Real-Time Availability */}
          <motion.div
            className="bg-white p-6 rounded-lg border hover:shadow-sm transition-shadow"
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4">
              <FaClock size={32} className="text-[#2499EF]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Real-Time Availability
            </h3>
            <p className="text-gray-600 text-center">
              Check room availability instantly and book without delay.
            </p>
          </motion.div>

          {/* Instant Booking Confirmation */}
          <motion.div
            className="bg-white p-6 rounded-lg border hover:shadow-sm transition-shadow"
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4">
              <FaCalendarCheck size={32} className="text-[#2499EF]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Instant Booking Confirmation
            </h3>
            <p className="text-gray-600 text-center">
              Get immediate confirmation of your bookings with ease.
            </p>
          </motion.div>

          {/* Flexible Scheduling */}
          <motion.div
            className="bg-white p-6 rounded-lg border hover:shadow-sm transition-shadow"
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4">
              <FaCalendarAlt size={32} className="text-[#2499EF]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Flexible Scheduling
            </h3>
            <p className="text-gray-600 text-center">
              Adjust your booking times to suit your needs with flexible
              scheduling options.
            </p>
          </motion.div>

          {/* 24/7 Support */}
          <motion.div
            className="bg-white p-6 rounded-lg border hover:shadow-sm transition-shadow"
            whileInView={{ opacity: 1, translateY: 0 }}
            initial={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4">
              <FaHeadset size={32} className="text-[#2499EF]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              24/7 Support
            </h3>
            <p className="text-gray-600 text-center">
              Our support team is here for you around the clock to ensure a
              smooth experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAdvertisement;
