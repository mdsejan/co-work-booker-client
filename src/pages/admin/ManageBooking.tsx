import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useAllBookingsQuery,
  useApproveBookingMutation,
  useDeleteBookingMutation,
} from "@/redux/features/booking/BookingApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

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
  const [deleteBooking] = useDeleteBookingMutation();
  const [approveBooking] = useApproveBookingMutation();
  const bookingData = { isConfirmed: "confirmed" };

  if (data?.success && !bookings.length) {
    setBookings(data.data);
  }

  const handleApprove = async (bookingId: string) => {
    const toastId = toast.loading("Approve Booking ...");

    if (!token) {
      alert(" token is required");
      return;
    }

    try {
      await approveBooking({ bookingId, token, bookingData }).unwrap();

      toast.success("Booking Approved successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      console.error("Server response:", error);

      toast.error("Error Approve Booking", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleDelete = (bookingId: string | undefined) => {
    if (!bookingId) return;

    const confirmDelete = async () => {
      try {
        const res = await deleteBooking({ token, bookingId }).unwrap();
        if (res?.success) {
          toast.success(res?.message, { duration: 1300 });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete the Booking");
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

  if (isLoading) return <LoadingAnimation />;
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
              <th className="px-4 py-2 border"> Date & Time</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
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
                  {/* Approve */}
                  {booking.isConfirmed === "unconfirmed" && (
                    <button
                      onClick={() => handleApprove(booking._id)}
                      className="bg-green-800 text-white px-3 py-1 rounded-md mr-2"
                    >
                      Approve
                    </button>
                  )}
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(booking._id)}
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
    </div>
  );
};

export default ManageBooking;
