import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetRoomsQuery,
  useUpdateRoomMutation,
} from "@/redux/features/room/RoomApi";
import { Room } from "@/types";
import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ManageRooms = () => {
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showUpdateRoomModal, setShowUpdateRoomModal] = useState(false);
  const [roomData, setRoomData] = useState({
    name: "",
    image: "",
    roomNo: 0,
    floorNo: 0,
    capacity: 0,
    pricePerSlot: 0,
    amenities: [] as string[],
  });
  const [amenitiesInput, setAmenitiesInput] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [deleteRoom] = useDeleteRoomMutation();
  const [createRoom] = useCreateRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const token = useSelector(useCurrentToken);

  const { data, isLoading, error } = useGetRoomsQuery({});
  const rooms = data?.data;

  const handleAddRoom = async (e: FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Creating Room ...");

    setRoomData({
      name: "",
      image: "",
      roomNo: 0,
      floorNo: 0,
      capacity: 0,
      pricePerSlot: 0,
      amenities: [],
    });
    setAmenitiesInput("");

    if (!token || !roomData) {
      alert("Room and token are required");
      return;
    }

    try {
      await createRoom({ token, roomData }).unwrap();
      toast.success("Room created successfully!", {
        id: toastId,
        duration: 2000,
      });

      setShowAddRoomModal(false);
    } catch (error) {
      console.error("Server response:", error);
      toast.error("Error creating Room", {
        id: toastId,
        duration: 2000,
      });
    }
    setShowAddRoomModal(false);
  };

  const handleUpdateRoomBtn = (room: Room) => {
    setSelectedRoomId(room._id);
    setRoomData({
      name: room.name,
      image: room.image || "",
      roomNo: room.roomNo,
      floorNo: room.floorNo,
      capacity: room.capacity,
      pricePerSlot: room.pricePerSlot,
      amenities: room.amenities,
    });
    setAmenitiesInput(room.amenities.join(", "));
    setShowUpdateRoomModal(true);
  };

  const handleUpdateRoom = async (e: FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating Room ...");

    if (!token || !roomData) {
      alert("Room data, token, and roomId are required");
      return;
    }

    try {
      await updateRoom({ roomId: selectedRoomId, token, roomData }).unwrap();

      toast.success("Room updated successfully!", {
        id: toastId,
        duration: 2000,
      });

      setShowUpdateRoomModal(false);
    } catch (error) {
      console.error("Server response:", error);

      toast.error("Error updating Room", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleDeleteRoom = (roomId: string) => {
    if (!roomId) return;

    const confirmDelete = async () => {
      try {
        const res = await deleteRoom({ token, roomId }).unwrap();
        if (res?.success) {
          toast.success(res?.message, { duration: 1300 });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete the Room");
      }
    };

    toast(
      <div>
        <p>Are you sure you want to delete this Room?</p>
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

  const handleAmenitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmenitiesInput(value);
    const amenitiesArray = value.split(",").map((item) => item.trim());
    setRoomData((prev) => ({
      ...prev,
      amenities: amenitiesArray,
    }));
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <p>Error fetching rooms. Please try again later.</p>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh] py-8">
      <div className="mb-8 flex flex-wrap justify-between">
        <h2 className="text-3xl font-semibold">Room Management</h2>
        <button
          onClick={() => setShowAddRoomModal(true)}
          className="bg-[#2499EF] text-white px-4 py-2 mt-6 lg:mt-0 rounded-md"
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
            {rooms?.map((room: Room) => (
              <tr key={room._id}>
                <td className="px-4 py-2 border">{room.name}</td>
                <td className="px-4 py-2 border">{room.roomNo}</td>
                <td className="px-4 py-2 border">{room.floorNo}</td>
                <td className="px-4 py-2 border">{room.capacity}</td>
                <td className="px-4 py-2 border">${room.pricePerSlot}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleUpdateRoomBtn(room)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2"
                  >
                    Edit
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

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md max-w-lg w-full max-h-full overflow-y-auto">
            <h3 className="text-2xl mb-4">Add New Room</h3>
            <form onSubmit={handleAddRoom}>
              <div className="mb-4">
                <label className="block mb-2">Room Name</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  placeholder="Conference Hall"
                  value={roomData.name}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  placeholder="https://example.com/room-image.jpg"
                  value={roomData.image}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Room Number</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="101"
                  value={roomData.roomNo}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      roomNo: parseInt(e.target.value, 10),
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Floor Number</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="2"
                  value={roomData.floorNo}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      floorNo: parseInt(e.target.value, 10),
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Capacity</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="50"
                  value={roomData.capacity}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      capacity: parseInt(e.target.value, 10),
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price Per Slot</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="300"
                  value={roomData.pricePerSlot}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      pricePerSlot: parseInt(e.target.value, 10),
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Amenities</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  placeholder="Projector, Microphone, TV Screen"
                  value={amenitiesInput}
                  onChange={handleAmenitiesChange}
                />
                <small className="text-gray-500">
                  Enter amenities separated by commas.
                </small>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAddRoomModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-sm hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Room Modal */}
      {showUpdateRoomModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md max-w-lg w-full max-h-full overflow-y-auto">
            <h3 className="text-2xl mb-4">Update Room</h3>
            <form onSubmit={handleUpdateRoom}>
              <div className="mb-4">
                <label className="block mb-2">Room Name</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  placeholder="Conference Hall"
                  value={roomData.name}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  value={roomData.image}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Room Number</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="101"
                  value={roomData.roomNo}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      roomNo: parseInt(e.target.value, 10),
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Floor Number</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="2"
                  value={roomData.floorNo}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      floorNo: parseInt(e.target.value, 10),
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Capacity</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="50"
                  value={roomData.capacity}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      capacity: parseInt(e.target.value, 10),
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Price Per Slot</label>
                <input
                  type="number"
                  className="border w-full p-2"
                  placeholder="300"
                  value={roomData.pricePerSlot}
                  onChange={(e) =>
                    setRoomData((prev) => ({
                      ...prev,
                      pricePerSlot: parseInt(e.target.value, 10),
                    }))
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Amenities</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  placeholder="Projector, Microphone, TV Screen"
                  value={amenitiesInput}
                  onChange={handleAmenitiesChange}
                />
                <small className="text-gray-500">
                  Enter amenities separated by commas.
                </small>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowUpdateRoomModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-sm hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Update Room
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
