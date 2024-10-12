import React, { useEffect } from "react";
import { motion } from "framer-motion";
import herobg from "/src/assets/hero-bg.jpg";

const AboutUs: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white py-16">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex justify-center items-center h-full">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h1>
        </div>
      </section>
      {/* Our Mission Section */}
      <section className="container mx-auto px-4 py-12 text-center mb-16">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our mission is to revolutionize the way co-working spaces are utilized
          by simplifying the room booking process. We aim to empower businesses,
          freelancers, and entrepreneurs with a seamless booking experience that
          maximizes productivity and collaboration. Through innovative
          technology and a user-centered approach, we strive to make workspace
          management efficient and accessible for all.
        </motion.p>
      </section>

      {/* Meet the Team Section */}
      <section className="container mx-auto px-4 text-center mb-16">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet the Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8">
          {[
            {
              name: "Alice Johnson",
              role: "CEO & Founder",
              image:
                "https://i.pinimg.com/564x/03/4e/69/034e69c955f7a5125c6e19c3ab1d9ce7.jpg",
            },
            {
              name: "David Smith",
              role: "CTO",
              image:
                "https://i.pinimg.com/564x/91/26/78/912678bb8ec990033758a665d707f4df.jpg",
            },
            {
              name: "Emily Carter",
              role: "Lead Developer",
              image:
                "https://i.pinimg.com/564x/01/b8/2f/01b82f5ebb6fef7f30705a06ad4cc3f5.jpg",
            },
            {
              name: "Michael Lee",
              role: "Product Manager",
              image:
                "https://i.pinimg.com/564x/2c/c9/6c/2cc96ca1a3950e16568695cf6d7ad51d.jpg",
            },
            {
              name: "Sarah Kim",
              role: "UX/UI Designer",
              image:
                "https://i.pinimg.com/564x/2a/1c/8e/2a1c8ece026ba585d73949a94163994d.jpg",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 shadow rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full object-cover w-32 h-32 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our journey began with a simple idea: to make co-working spaces more
          efficient and accessible. As founders who often struggled with the
          complexities of booking meeting rooms, we saw an opportunity to
          innovate. From humble beginnings, we evolved into a full-fledged
          platform that now serves thousands of users, streamlining the booking
          process and making it easier for businesses to focus on what truly
          matters—growing and succeeding.
        </motion.p>
      </section>
    </div>
  );
};

export default AboutUs;
