import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useEffect } from "react";

const RoomDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const roomData = {
    _id: "667542abd42a77b20d9afc54",
    name: "Training Room",
    roomNo: 203,
    floorNo: 2,
    capacity: 25,
    pricePerSlot: 120,
    amenities: ["Projector", "Whiteboard", "Sound System"],
    images: [
      "/path-to-image1.jpg",
      "/path-to-image2.jpg",
      "/path-to-image3.jpg",
    ],
  };

  return (
    <div className="max-w-screen-2xl mx-auto min-h-[70vh] px-8 py-16 bg-white rounded-lg">
      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {roomData.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Room Image ${index + 1}`}
            className="rounded-lg"
          />
        ))}
      </div>

      {/* Room Information */}
      <div className="flex flex-col md:flex-row md:gap-32">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-4">{roomData.name}</h1>
          <p>Room No: {roomData.roomNo}</p>
          <p>Floor No: {roomData.floorNo}</p>
          <p>Capacity: {roomData.capacity} people</p>
          <p>Price Per Slot: ${roomData.pricePerSlot}</p>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <ul className="list-disc list-inside">
            {roomData.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Book Now Button */}
      <Link to="/booking-page">
        <motion.button className="mt-4 bg-[#14141E] text-white px-4 py-2 rounded-full flex items-center gap-2 group w-fit more-btn">
          Book Now
          <motion.span className="flex items-center">
            <FiArrowRight className="arrow" />
          </motion.span>
        </motion.button>
      </Link>
    </div>
  );
};

export default RoomDetails;
