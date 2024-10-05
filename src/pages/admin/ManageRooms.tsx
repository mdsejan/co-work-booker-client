import { useGetRoomsQuery } from "@/redux/features/room/RoomApi";
import { Room } from "@/types";
import { useState } from "react";

const ManageRooms = () => {
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  const { data, isLoading, error } = useGetRoomsQuery({});
  const roomData = data?.data;

  const handleAddRoom = () => {
    setShowAddRoomModal(false);
  };

  const handleUpdateRoom = (roomId: string) => {
    alert(`Update room with ID: ${roomId}`);
  };

  const handleDeleteRoom = (roomId: string) => {
    alert(`Delete room with ID: ${roomId}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching rooms. Please try again later.</p>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh] py-8">
      <div className="mb-8 flex justify-between">
        <h2 className="text-3xl font-semibold">Room Management</h2>
        <button
          onClick={() => setShowAddRoomModal(true)}
          className="bg-[#2499EF] text-white px-4 py-2 rounded-md"
        >
          Create Room
        </button>
      </div>

      {/* Rooms Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-[#2499EF] text-white">
            <tr>
              <th className="px-4 py-2 border">Room Name</th>
              <th className="px-4 py-2 border">Room Number</th>
              <th className="px-4 py-2 border">Floor No.</th>
              <th className="px-4 py-2 border">Capacity</th>
              <th className="px-4 py-2 border">Price/Slot</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roomData?.map((room: Room) => (
              <tr key={room._id}>
                <td className="px-4 py-2 border">{room.name}</td>
                <td className="px-4 py-2 border">{room.roomNo}</td>
                <td className="px-4 py-2 border">{room.floorNo}</td>
                <td className="px-4 py-2 border">{room.capacity}</td>
                <td className="px-4 py-2 border">${room.pricePerSlot}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleUpdateRoom(room._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md max-w-lg w-full">
            <h3 className="text-2xl mb-4">Add New Room</h3>
            <form onSubmit={handleAddRoom}>
              <div className="mb-4">
                <label className="block mb-2">Room Name</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  placeholder="Conference Hall"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Room Number</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="101"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Floor Number</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Capacity</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price Per Slot</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="300"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddRoomModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2499EF] text-white px-4 py-2 rounded-md"
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;
