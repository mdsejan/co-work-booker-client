import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useBookingsQuery } from "@/redux/features/booking/BookingApi";
import { Booking } from "@/types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const token = useSelector(useCurrentToken);
  const { data, isLoading } = useBookingsQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  const bookingData = data?.data;
  console.log(bookingData);

  if (isLoading) return <LoadingAnimation />;

  if (!bookingData) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl py-5">You don’t have any bookings.</h3>
          <Link
            to="/meeting-rooms"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Book a Room
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh] py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold">My Bookings</h2>
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-[#2499EF] text-white">
            <tr>
              <th className="px-4 py-2 border">Room Name</th>
              <th className="px-4 py-2 border">Room Number</th>
              <th className="px-4 py-2 border">Booking Date</th>
              <th className="px-4 py-2 border">Time Slots</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingData?.map((booking: Booking) => (
              <tr key={booking._id}>
                <td className="px-4 py-2 border">{booking.room.name}</td>
                <td className="px-4 py-2 border">{booking.room.roomNo}</td>
                <td className="px-4 py-2 border">
                  {new Date(booking.slots[0].date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {booking.slots
                    .map((slot) => `${slot.startTime} - ${slot.endTime}`)
                    .join(", ")}
                </td>
                <td className="px-4 py-2 border">${booking.totalAmount}</td>
                <td
                  className={`px-4 py-2 border capitalize font-semibold ${
                    booking.isConfirmed === "confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.isConfirmed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
