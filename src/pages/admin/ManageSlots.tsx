import { useGetRoomsQuery } from "@/redux/features/room/RoomApi";
import { useAllSlotsQuery } from "@/redux/features/slots/SlotApi";
import { Room, Slots } from "@/types";
import { useState } from "react";

const ManageSlots = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const room = selectedRoom?._id;
  const roomNo = selectedRoom?.roomNo;

  const { data, isLoading, error } = useAllSlotsQuery({});
  const slotsData = data?.data;

  const { data: roomsData } = useGetRoomsQuery({});

  const handleAddSlot = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRoomSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = e.target.value;
    const room = roomsData?.data?.find((room: Room) => room._id === roomId);
    setSelectedRoom(room || null);
  };

  const handleSubmitSlot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    const getSlotsData = { room, roomNo, date, startTime, endTime };

    console.log(getSlotsData);

    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading slots data.</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh] py-8">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Slots Management</h2>

        <button
          onClick={handleAddSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Slot
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Create Slot</h3>
            <form onSubmit={handleSubmitSlot}>
              {/* Room */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select a Room
                </label>
                <select
                  className="mt-1 block w-full px-4 py-2 border rounded-lg"
                  onChange={handleRoomSelect}
                  required
                >
                  <option value="">Choose a Room</option>
                  {roomsData?.data?.map((room: Room, index: number) => (
                    <option key={index} value={room._id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room No */}
              <input
                id="roomNo"
                name="roomNo"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={selectedRoom?.roomNo ?? ""}
                readOnly
              />

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

              {/* Actions */}
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

      {/* Slots Lists */}
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
            {slotsData?.map((slot: Slots, index: number) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{slot?.room?.name}</td>
                <td className="px-4 py-2 border">{slot.room.roomNo}</td>
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
