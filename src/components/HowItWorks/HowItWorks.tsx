import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#EEE6F4] rounded-full px-6 py-2">
            <h2 className="text-3xl font-extrabold text-[#663593]">
              How It Works
            </h2>
          </div>
          <p className="text-xl text-gray-800 mt-4">
            A simple guide to booking your meeting room with ease.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Timeline Connector */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px bg-[#2499EF] h-full z-0"></div>

          <div className="flex justify-between items-center">
            {/* Step 1: Select a Room */}
            <motion.div
              className="bg-white p-6 border border-gray-200 rounded-lg text-left relative z-10"
              whileInView={{ opacity: 1, translateY: 0 }}
              initial={{ opacity: 0, translateY: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4 mx-auto">
                <FaCalendarAlt size={32} className="text-[#2499EF]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Select a Room
              </h3>
              <p className="text-gray-600 text-center">
                Choose from a variety of available rooms that suit your meeting
                needs.
              </p>
            </motion.div>

            {/* Step 2: Choose Date & Time */}
            <motion.div
              className="bg-white p-6 border border-gray-200 rounded-lg text-left relative z-10"
              whileInView={{ opacity: 1, translateY: 0 }}
              initial={{ opacity: 0, translateY: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4 mx-auto">
                <FaClock size={32} className="text-[#2499EF]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Choose Date & Time
              </h3>
              <p className="text-gray-600 text-center">
                Select the preferred date and time slots for your meeting from
                our calendar.
              </p>
            </motion.div>

            {/* Step 3: Confirm Booking */}
            <motion.div
              className="bg-white p-6 border border-gray-200 rounded-lg text-left relative z-10"
              whileInView={{ opacity: 1, translateY: 0 }}
              initial={{ opacity: 0, translateY: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-center bg-[#EEE6F4] rounded-full w-16 h-16 mb-4 mx-auto">
                <FaCheckCircle size={32} className="text-[#2499EF]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Confirm Booking
              </h3>
              <p className="text-gray-600 text-center">
                Review your details and confirm your booking with just a few
                clicks.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
