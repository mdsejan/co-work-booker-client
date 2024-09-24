import React from "react";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import RoomCard from "../RoomCard/RoomCard";
import { Link } from "react-router-dom";
import { useGetRoomsQuery } from "@/redux/api/api";
import { Room } from "@/types";

const FeaturedRooms: React.FC = () => {
  const { data: roomsData } = useGetRoomsQuery({});

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#EEE6F4] rounded-full px-6 py-2">
            <h2 className="text-3xl font-extrabold text-[#663593]">
              Featured Rooms
            </h2>
          </div>
          <p className="text-xl text-gray-800 mt-4">
            Explore our top meeting rooms tailored for your needs.
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roomsData?.data?.slice(0, 4).map((room: Room) => (
            <RoomCard
              key={room._id}
              roomId={room._id}
              image={room.image || "https://via.placeholder.com/300x200"}
              name={room.name}
              capacity={room.capacity}
              pricePerSlot={room.pricePerSlot}
            />
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-12">
          <Link to="/meeting-rooms">
            <motion.button className="mt-4 bg-[#14141E] text-white px-8 py-2 rounded-full flex items-center gap-2 group w-fit more-btn">
              All Rooms
              <motion.span className="flex items-center">
                <FiArrowRight className="arrow" />
              </motion.span>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
