import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetRoomsQuery } from "@/redux/features/room/RoomApi";
import {
  useAllSlotsQuery,
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} from "@/redux/features/slots/SlotApi";
import { Room, Slots } from "@/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ManageSlots = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [slotData, setSlotData] = useState({
    room: "",
    roomName: "",
    date: "",
    startTime: "",
    endTime: "",
    isBooked: false,
  });

  console.log(slotData);

  const [deleteSlot] = useDeleteSlotMutation();
  const [updateSlot] = useUpdateSlotMutation();
  const token = useSelector(useCurrentToken);

  const room = selectedRoom?._id;

  const { data, isLoading, error } = useAllSlotsQuery({});
  const slotsData = data?.data;

  const { data: roomsData } = useGetRoomsQuery({});

  const [createSlot] = useCreateSlotMutation();

  const handleAddSlot = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  };

  const handleRoomSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = e.target.value;
    const room = roomsData?.data?.find((room: Room) => room._id === roomId);
    setSelectedRoom(room || null);
  };

  const handleOpenUpdateModal = (slot: Slots) => {
    setSelectedSlotId(slot._id);
    setSlotData({
      room: slot.room._id,
      roomName: slot.room.name,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: false,
    });
    setIsUpdateModalOpen(true);
  };

  const handleSubmitSlot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Creating Slot ...");

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    if (!token || !room) {
      alert("Room and token are required");
      return;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const timePattern = /^\d{2}:\d{2}$/;

    if (!date.match(datePattern)) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    if (!startTime.match(timePattern) || !endTime.match(timePattern)) {
      alert("Invalid time format. Please use HH:MM.");
      return;
    }

    try {
      await createSlot({ token, slotData }).unwrap();
      toast.success("Slot created successfully!", {
        id: toastId,
        duration: 2000,
      });
      handleCloseModal();
    } catch (error) {
      console.log(error);
      toast.error("Error creating slot", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleUpdateSlot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Updating Slot ...");

    const formData = new FormData(e.currentTarget);
    const date = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;

    if (!token || !selectedSlotId) {
      alert("Slot ID and token are required");
      return;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const timePattern = /^\d{2}:\d{2}$/;

    if (!date.match(datePattern)) {
      alert("Invalid date format. Please use YYYY-MM-DD.");
      return;
    }

    if (!startTime.match(timePattern) || !endTime.match(timePattern)) {
      alert("Invalid time format. Please use HH:MM.");
      return;
    }

    const filterSlotData = {
      room: slotData.room,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };

    try {
      await updateSlot({
        token,
        slotId: selectedSlotId,
        slotData: filterSlotData,
      }).unwrap();
      toast.success("Slot updated successfully!", {
        id: toastId,
        duration: 2000,
      });
      handleUpdateModalClose();
    } catch (error) {
      toast.error("Error updating slot", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleDeleteSlot = (slotId: string | undefined) => {
    if (!slotId) return;

    const confirmDelete = async () => {
      try {
        const res = await deleteSlot({ token, slotId }).unwrap();
        if (res?.success) {
          toast.success(res?.message, { duration: 1300 });
        }
      } catch (err) {
        toast.error("Failed to delete the slot");
      }
    };

    toast(
      <div>
        <p>Are you sure you want to delete this slot?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              confirmDelete();
              toast.dismiss();
            }}
            className="bg-red-500 text-white py-1 px-3 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white py-1 px-3 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        duration: 5000,
      }
    );
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>Error loading slots data.</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh] py-8">
      <div className="mb-8 flex flex-wrap justify-between items-center">
        <h2 className="text-3xl font-semibold">Slots Management</h2>

        <button
          onClick={handleAddSlot}
          className="bg-blue-500 text-white px-4 py-2 mt-6 lg-mt-0 rounded hover:bg-blue-600"
        >
          Create Slot
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg max-h-full overflow-y-auto p-6 rounded shadow-lg">
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Slot Modal */}
      {isUpdateModalOpen && slotData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg max-h-full overflow-y-auto p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Update Slot</h3>
            <form onSubmit={handleUpdateSlot}>
              {/* Room */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Room
                </label>
                <input
                  type="text"
                  value={slotData.roomName}
                  readOnly
                  className="mt-1 block w-full px-4 py-2 border rounded-lg bg-gray-200"
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
                  defaultValue={slotData.date}
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
                  defaultValue={slotData.startTime}
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
                  defaultValue={slotData.endTime}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdateModalClose}
                  className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-[#2499EF] text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Room</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Start Time</th>
              <th className="border border-gray-300 px-4 py-2">End Time</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slotsData?.map((slot: Slots) => (
              <tr key={slot._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.room.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.startTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {slot.endTime}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleOpenUpdateModal(slot)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSlot(slot._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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

export default ManageSlots;
