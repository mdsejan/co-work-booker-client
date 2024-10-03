import { useState } from "react";

const ManageSlots = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slotsData, setSlotsData] = useState([
    {
      room: "Conference Hall",
      roomNo: 101,
      date: "2024-07-25",
      startTime: "09:00",
      endTime: "14:00",
    },
    {
      room: "Meeting Room A",
      roomNo: 102,
      date: "2024-07-26",
      startTime: "10:00",
      endTime: "13:00",
    },
  ]);

  // Open the modal
  const handleAddSlot = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Type-safe form submission handler
  const handleSubmitSlot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const room = formData.get("room") as string;
    const roomNo = parseInt(formData.get("roomNo") as string);
    const date = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    // Add new slot to slotsData
    setSlotsData((prev) => [
      ...prev,
      { room, roomNo, date, startTime, endTime },
    ]);
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh] py-8">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Slots Management</h2>
        {/* Create Slot Button */}
        <button
          onClick={handleAddSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Slot
        </button>
      </div>

      {/* Render Slot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Create Slot</h3>
            <form onSubmit={handleSubmitSlot}>
              {/* Room Name */}
              <div className="mb-4">
                <label htmlFor="room" className="block mb-2 font-medium">
                  Room
                </label>
                <input
                  type="text"
                  id="room"
                  name="room"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Conference Hall"
                  required
                />
              </div>

              {/* Room No */}
              <div className="mb-4">
                <label htmlFor="roomNo" className="block mb-2 font-medium">
                  Room Number
                </label>
                <input
                  type="number"
                  id="roomNo"
                  name="roomNo"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="101"
                  required
                />
              </div>

              {/* Date */}
              <div className="mb-4">
                <label htmlFor="date" className="block mb-2 font-medium">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>

              {/* Start Time */}
              <div className="mb-4">
                <label htmlFor="startTime" className="block mb-2 font-medium">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>

              {/* End Time */}
              <div className="mb-4">
                <label htmlFor="endTime" className="block mb-2 font-medium">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slots List Table */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-[#2499EF] text-white">
            <tr>
              <th className="px-4 py-2 border">Room Name</th>
              <th className="px-4 py-2 border">Room No.</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Start Time</th>
              <th className="px-4 py-2 border">End Time</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slotsData.map((slot, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{slot.room}</td>
                <td className="px-4 py-2 border">{slot.roomNo}</td>
                <td className="px-4 py-2 border">
                  {new Date(slot.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">{slot.startTime}</td>
                <td className="px-4 py-2 border">{slot.endTime}</td>
                <td className="px-4 py-2 border">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2">
                    Update
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded-md">
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

export default ManageSlots;
