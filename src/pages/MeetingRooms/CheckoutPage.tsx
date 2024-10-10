import BookingConfirmationModal from "@/components/room/BookingConfirmationModal";
import React, { useState } from "react"; // Modal component

const CheckoutPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Booking Data (Replace this with actual data from Redux or props)
  const bookingSummary = {
    roomName: "Conference Room A",
    date: "2024-10-12",
    time: "10:00 AM - 11:00 AM",
    cost: 300,
    user: "John Doe",
    email: "johndoe@example.com",
  };

  const handleConfirmBooking = () => {
    setIsModalOpen(true); // Open confirmation modal
  };

  return (
    <div className="max-w-screen-md border mx-5 md:mx-auto my-14 p-6 md:p-16">
      {/* Booking Summary */}
      <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full table-auto">
          <tbody>
            <tr>
              <td className="font-semibold py-2">Room:</td>
              <td className="py-2">{bookingSummary.roomName}</td>
            </tr>
            {/* Line row */}
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Date:</td>
              <td className="py-2">{bookingSummary.date}</td>
            </tr>
            {/* Line row */}
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Time:</td>
              <td className="py-2">{bookingSummary.time}</td>
            </tr>
            {/* Line row */}
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Cost:</td>
              <td className="py-2">${bookingSummary.cost}</td>
            </tr>
            {/* Line row */}
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Name:</td>
              <td className="py-2">{bookingSummary.user}</td>
            </tr>
            {/* Line row */}
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Email:</td>
              <td className="py-2">{bookingSummary.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>Stripe Card Input Placeholder</p>
        </div>
      </div>

      {/* Confirm Booking Button */}
      <button
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        onClick={handleConfirmBooking}
      >
        Confirm Booking and Pay
      </button>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <BookingConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookingDetails={bookingSummary}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
