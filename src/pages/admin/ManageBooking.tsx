import { useState } from "react";

interface Booking {
  roomName: string;
  userName: string;
  dateTime: string;
  status: "Confirmed" | "Unconfirmed";
}

const ManageBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      roomName: "Conference Hall",
      userName: "John Doe",
      dateTime: "2024-07-25 09:00",
      status: "Unconfirmed",
    },
    {
      roomName: "Meeting Room A",
      userName: "Jane Smith",
      dateTime: "2024-07-26 10:00",
      status: "Confirmed",
    },
  ]);

  const handleApprove = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = "Confirmed";
    setBookings(updatedBookings);
  };

  const handleReject = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = "Unconfirmed";
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

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh] py-8">
      <h2 className="text-3xl font-semibold mb-8">Booking Management</h2>

      {/* Booking List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-[#2499EF] text-white">
            <tr>
              <th className="px-4 py-2 border">Room Name</th>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Date & Time</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{booking.roomName}</td>
                <td className="px-4 py-2 border">{booking.userName}</td>
                <td className="px-4 py-2 border">{booking.dateTime}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      booking.status === "Confirmed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {/* Approve Booking */}
                  {booking.status === "Unconfirmed" && (
                    <button
                      onClick={() => handleApprove(index)}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      Approve
                    </button>
                  )}
                  {/* Reject Booking */}
                  {booking.status === "Confirmed" && (
                    <button
                      onClick={() => handleReject(index)}
                      className="text-orange-500 hover:underline mr-4"
                    >
                      Reject
                    </button>
                  )}
                  {/* Delete Booking */}
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
