import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useBookingsQuery } from "@/redux/features/booking/BookingApi";
import { Booking } from "@/types";
import { useSelector } from "react-redux";

const MyBookings = () => {
  const token = useSelector(useCurrentToken);
  const { data, error, isLoading } = useBookingsQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  const bookingData = data?.data;

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p>Error loading bookings.</p>;
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
