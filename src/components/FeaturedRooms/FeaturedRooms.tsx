import React from "react";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import RoomCard from "../RoomCard/RoomCard";

// Demo JSON Data
const roomsData = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200",
    name: "Conference Room A",
    capacity: 10,
    pricePerSlot: 50,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200",
    name: "Meeting Room B",
    capacity: 8,
    pricePerSlot: 40,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200",
    name: "Board Room C",
    capacity: 15,
    pricePerSlot: 60,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x200",
    name: "Training Room D",
    capacity: 20,
    pricePerSlot: 75,
  },
];

const FeaturedRooms: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Featured Rooms
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Explore our top meeting rooms tailored for your needs.
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roomsData.map((room) => (
            <RoomCard
              key={room.id}
              image={room.image}
              name={room.name}
              capacity={room.capacity}
              pricePerSlot={room.pricePerSlot}
            />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center mt-12">
          <motion.button
            className="bg-[#14141E] text-white px-16 py-2 rounded-full flex items-center gap-2 group mx-auto"
            whileHover={{ scale: 1.05 }} // Slight scale-up on hover
            transition={{ duration: 0.3 }}
          >
            See More
            <motion.span
              className="flex items-center"
              whileHover={{ x: 5 }} // Arrow icon moves right on hover
              transition={{ duration: 0.3 }}
            >
              <FiArrowRight />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
