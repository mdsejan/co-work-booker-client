import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useGetRoomByIdQuery } from "@/redux/api/api";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import ErrorLoadingData from "@/components/LoadingAnimation/ErrorLoadingData";
import BookingModal from "@/components/room/BookingModal";
import { useAvailableDatesQuery } from "@/redux/features/slots/SlotApi";

const RoomDetails = () => {
  const { id } = useParams();
  const { data: roomData, error, isLoading } = useGetRoomByIdQuery(id);
  const roomId = roomData?.data?._id;
  const { data } = useAvailableDatesQuery(roomId);
  const dates = data?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <LoadingAnimation />;
  if (error) return <ErrorLoadingData />;

  // Function to handle modal open
  const openBookingModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-screen-lg mx-auto min-h-[70vh] px-8 py-16 bg-white rounded-lg">
      {/* Image Gallery */}
      <div className="">
        <img
          src={roomData?.data?.image}
          alt={roomData?.data?.name}
          className="w-full h-[50vh] object-cover rounded-lg mb-8"
        />
      </div>

      {/* Room Information */}
      <div className="flex flex-col md:flex-row md:gap-32">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-4">
            {roomData?.data?.name}
          </h1>
          <p>Room No: {roomData?.data?.roomNo}</p>
          <p>Floor No: {roomData?.data?.floorNo}</p>
          <p>Capacity: {roomData?.data?.capacity} people</p>
          <p>Price Per Slot: ${roomData?.data?.pricePerSlot}</p>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <ul className="list-disc list-inside">
            {roomData?.data?.amenities?.map(
              (amenity: string, index: number) => (
                <li key={index}>{amenity}</li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Book Now Button */}
      <motion.button
        onClick={openBookingModal} // Open the booking modal on click
        className="mt-4 bg-[#14141E] text-white px-4 py-2 rounded-full flex items-center gap-2 group w-fit more-btn"
      >
        Book Now
        <motion.span className="flex items-center">
          <FiArrowRight className="arrow" />
        </motion.span>
      </motion.button>

      {/* Booking Modal */}
      <BookingModal
        roomId={roomId}
        dates={dates}
        isOpen={isModalOpen}
        onClose={closeBookingModal}
      />
    </div>
  );
};

export default RoomDetails;
