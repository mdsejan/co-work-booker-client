const MyBookings = () => {
  // Demo booking data (this will normally come from the API)
  const bookingData = [
    {
      _id: "66754f3574ad67341766d569",
      room: {
        name: "Conference Room",
        roomNo: 201,
        floorNo: 1,
        capacity: 75,
        pricePerSlot: 160,
        amenities: ["Projector", "Whiteboard"],
      },
      slots: [
        { _id: "1", date: "2024-07-15", startTime: "09:00", endTime: "10:00" },
        { _id: "2", date: "2024-07-15", startTime: "10:00", endTime: "11:00" },
      ],
      totalAmount: 200,
      isConfirmed: "confirmed",
    },
    {
      _id: "66765c25cba04afd22d5a6fb",
      room: {
        name: "Executive Board Room",
        roomNo: 204,
        floorNo: 2,
        capacity: 10,
        pricePerSlot: 150,
        amenities: ["Projector", "Whiteboard", "Conference Phone"],
      },
      slots: [
        { _id: "1", date: "2024-07-15", startTime: "10:00", endTime: "11:00" },
        { _id: "2", date: "2024-07-15", startTime: "11:00", endTime: "12:00" },
      ],
      totalAmount: 300,
      isConfirmed: "unconfirmed",
    },
  ];

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
            {bookingData.map((booking) => (
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
