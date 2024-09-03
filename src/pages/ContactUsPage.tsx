import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactUsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-screen-2xl mx-auto">
        {/* Contact Information */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="flex items-center bg-gray-50 p-6 rounded-lg border"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FiMail className="text-4xl text-[#2499EF] mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">contact@company.com</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center bg-gray-50 p-6 rounded-lg border"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FiPhone className="text-4xl text-[#2499EF] mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center bg-gray-50 p-6 rounded-lg border"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FiMapPin className="text-4xl text-[#2499EF] mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Office</h3>
              <p className="text-gray-600">123 Business St, City, Country</p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-lg border">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <form className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2499EF]"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2499EF]"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2499EF]"
                placeholder="Subject"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2499EF]"
                rows={5}
                placeholder="Your Message"
              ></textarea>
            </div>

            <motion.button
              className="bg-[#14141E] text-white py-2 px-6 rounded-full hover:bg-[#2499EF] transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
