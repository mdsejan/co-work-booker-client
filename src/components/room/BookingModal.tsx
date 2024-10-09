import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiX } from "react-icons/fi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { useLazyRoomSlotsQuery } from "@/redux/features/slots/SlotApi"; // Import the query
import { BookingFormData, Slot } from "@/types";

interface BookingModalProps {
  roomId: string;
  dates?: string[];
  isOpen: boolean;
  onClose: () => void;
}

interface AvailableSlot {
  id: string;
  timeRange: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  roomId,
  dates,
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>();
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [availableTimeSlots, setAvailableTimeSlots] = useState<AvailableSlot[]>(
    []
  );
  const [selectedSlotId, setSelectedSlotId] = useState("");

  // Lazy query to fetch available slots
  const [triggerRoomSlots, { data: slotData, isLoading, error }] =
    useLazyRoomSlotsQuery();

  // Format provided dates into JS Date objects
  const formattedDates =
    Array.isArray(dates) && dates.length > 0
      ? dates.map((date) => new Date(date))
      : [];
  const hasAvailableDates = formattedDates.length > 0;

  // Get current user data
  const currentUser = useSelector(selectCurrentUser);
  const { data } = useGetUserQuery(currentUser?.userId);
  const userData = data?.data;

  // Form submission
  const onSubmit = () => {
    const bookingDetails = {
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
      user: currentUser?.userId,
      room: roomId,
      slots: [selectedSlotId],
    };
    console.log("Booking Details: ", bookingDetails);
  };

  const handleSlotChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlotId(event.target.value);
  };

  // Fetch available time slots when the date changes
  useEffect(() => {
    if (selectedDate && roomId) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      triggerRoomSlots({ roomId, date: formattedDate });
    }
  }, [selectedDate, roomId, triggerRoomSlots]);

  // Update available time slots based on API response
  useEffect(() => {
    if (slotData?.data && !isLoading && !error) {
      const slots = slotData.data
        .filter((slot: Slot) => !slot.isBooked)
        .map((slot: Slot) => ({
          id: slot._id,
          timeRange: `${slot.startTime} - ${slot.endTime}`,
        }));

      setAvailableTimeSlots(slots);
    }
  }, [slotData, isLoading, error]);

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
                {hasAvailableDates ? (
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="mt-1 block w-full px-4 py-2 border rounded-lg"
                    minDate={new Date()}
                    includeDates={formattedDates}
                    required
                    placeholderText="Click to Select Date"
                    filterDate={(date) =>
                      formattedDates.some(
                        (availableDate) =>
                          date.toDateString() === availableDate.toDateString()
                      )
                    }
                  />
                ) : (
                  <p className="text-red-500 text-base font-medium mt-2">
                    No available dates for booking.
                  </p>
                )}

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
                  onChange={handleSlotChange}
                  value={selectedSlotId}
                >
                  <option value="">Choose a time slot</option>
                  {availableTimeSlots.map((slot) => (
                    <option key={slot?.id} value={slot?.id}>
                      {slot?.timeRange}
                    </option>
                  ))}
                </select>

                {errors.timeSlot && (
                  <p className="text-red-500 text-sm">
                    {errors.timeSlot.message}
                  </p>
                )}
                {isLoading && <p className="text-blue-500">Loading slots...</p>}
                {error && <p className="text-red-500">Failed to load slots.</p>}
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
                disabled={isLoading || !selectedSlotId}
                className={`w-full py-3 rounded-lg font-semibold ${
                  selectedDate && selectedSlotId
                    ? "bg-[#2499EF] hover:bg-[#0E73BE] text-white"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                Process to Checkout
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default BookingModal;
