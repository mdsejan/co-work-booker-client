import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { toast } from "sonner";

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFormError("Please fill in all the fields.");
      return;
    }

    toast.success("Message sent successfully!");

    setSuccessMessage("Message sent successfully!");
    setFormError("");
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-screen-md mx-auto">
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

          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2499EF]"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2499EF]"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2499EF]"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2499EF]"
                rows={5}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="bg-[#14141E] text-white py-2 px-6 rounded-full hover:bg-[#2499EF] transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Send Message
            </motion.button>

            {formError && (
              <p className="text-red-500 mb-4 text-center">{formError}</p>
            )}
            {successMessage && (
              <p className="text-green-500 mb-4 text-center">
                {successMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
