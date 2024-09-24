import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

interface RoomCardProps {
  roomId: string;
  image: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomId,
  image,
  name,
  capacity,
  pricePerSlot,
}) => {
  return (
    <motion.div
      className="bg-white border border-gray-300 rounded-lg overflow-hidden"
      whileInView={{ opacity: 1, translateY: 0 }}
      initial={{ opacity: 0, translateY: 20 }}
      transition={{ duration: 0.5 }}
    >
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">Capacity: {capacity} people</p>
        <p className="text-gray-600">Price per Slot: ${pricePerSlot}</p>

        {/* See Details Button */}
        <Link to={`/room-details/${roomId}`}>
          <motion.button className="mt-4 bg-[#14141E] text-white px-4 py-1 rounded-full flex items-center gap-2 group w-fit more-btn">
            See Details
            <motion.span className="flex items-center">
              <FiArrowRight className="arrow" />
            </motion.span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default RoomCard;
