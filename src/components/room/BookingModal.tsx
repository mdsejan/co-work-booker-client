import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiX } from "react-icons/fi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { BookingFormData } from "@/types";

const availableTimeSlots = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Get current user data
  const currentUser = useSelector(selectCurrentUser);
  const { data } = useGetUserQuery(currentUser?.userId);
  const userData = data?.data;

  // form submission
  const onSubmit = (formData: BookingFormData) => {
    const bookingDetails = {
      ...formData,
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
    };
    console.log("Booking Details: ", bookingDetails);
  };

  return (
    <>
      {isOpen && (
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
              Book Your Slot
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  minDate={new Date()}
                />

                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Time Slot
                </label>
                <select
                  {...register("timeSlot", {
                    required: "Please select a time slot",
                  })}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Choose a time slot</option>
                  {availableTimeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.timeSlot && (
                  <p className="text-red-500 text-sm">
                    {errors.timeSlot.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  defaultValue={userData?.name || ""}
                  readOnly
                  {...register("userName", { required: true })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  defaultValue={userData?.email || ""}
                  readOnly
                  {...register("email", { required: true })}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2499EF] hover:bg-[#0E73BE] text-white font-semibold py-3 rounded-lg"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default BookingModal;
