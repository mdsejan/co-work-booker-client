import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

interface BookingDetails {
  roomName: string;
  date: string;
  time: string;
  cost: number;
  user: string;
  email: string;
}

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingDetails,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Booking Confirmed!
        </h2>
        <p className="mb-2">
          <strong>Room:</strong> {bookingDetails?.roomName}
        </p>
        <p className="mb-2">
          <strong>Date:</strong> {bookingDetails?.date}
        </p>
        <p className="mb-2">
          <strong>Time:</strong> {bookingDetails?.time}
        </p>
        <p className="mb-2">
          <strong>Total Cost:</strong> ${bookingDetails?.cost}
        </p>

        <p className="text-center mt-6 font-semibold">
          Thank you for your booking!
        </p>
      </div>
    </motion.div>
  );
};

export default BookingConfirmationModal;
