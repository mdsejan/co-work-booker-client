import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAllBookingsQuery } from "@/redux/features/booking/BookingApi";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Booking {
  _id: string;
  room: {
    name: string;
  };
  user: {
    name: string;
  };
  date: string;
  isConfirmed: "confirmed" | "unconfirmed";
}

const ManageBooking = () => {
  const token = useSelector(useCurrentToken);
  const { data, isLoading, isError } = useAllBookingsQuery(token);
  const [bookings, setBookings] = useState<Booking[]>([]);

  if (data?.success && !bookings.length) {
    setBookings(data.data);
  }

  const handleApprove = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].isConfirmed = "confirmed";
    setBookings(updatedBookings);
  };

  const handleDelete = (index: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirmed) {
      const updatedBookings = bookings.filter((_, i) => i !== index);
      setBookings(updatedBookings);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading bookings</div>;

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh] py-8">
      <h2 className="text-3xl font-semibold mb-8">Booking Management</h2>

      {/* Booking List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-[#2499EF] text-white">
            <tr>
              <th className="px-4 py-2 border">Room Name</th>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td className="px-4 py-2 border">{booking.room.name}</td>
                <td className="px-4 py-2 border">{booking.user.name}</td>
                <td className="px-4 py-2 border">
                  {new Date(booking.date).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      booking.isConfirmed === "confirmed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {booking.isConfirmed}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {/* Approve*/}
                  {booking.isConfirmed === "unconfirmed" && (
                    <button
                      onClick={() => handleApprove(index)}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      Approve
                    </button>
                  )}
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
