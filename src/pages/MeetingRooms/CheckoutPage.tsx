import BookingConfirmationModal from "@/components/room/BookingConfirmationModal";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// Adjust the path based on your project structure
import { useSelector } from "react-redux";
import { usePaymentIntentMutation } from "@/redux/features/booking/BookingApi";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const CheckoutPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const location = useLocation();
  const { bookingDetails, bookingSummary } = location.state || {};
  const amount = bookingSummary?.sCost;

  console.log(bookingDetails, amount);

  const stripe = useStripe();
  const elements = useElements();

  const token = useSelector(useCurrentToken);
  const [paymentIntent] = usePaymentIntentMutation();

  const handleConfirmBooking = async () => {
    setPaymentProcessing(true);
    setErrorMessage(null);

    try {
      if (!stripe || !elements) {
        throw new Error("Stripe has not loaded. Please refresh and try again.");
      }

      const amount = bookingSummary?.sCost
        ? Math.round(bookingSummary.sCost * 100)
        : 0;

      if (amount <= 0) {
        throw new Error("Invalid amount. Please check your booking details.");
      }

      const { data } = await paymentIntent({
        token,
        amount,
      });

      console.log("Payment Intent Response:", data);

      if (data?.data?.clientSecret) {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          throw new Error("Could not find card element. Please try again.");
        }

        const { error, paymentIntent: stripePaymentIntent } =
          await stripe.confirmCardPayment(data?.data?.clientSecret, {
            payment_method: {
              card: cardElement,
            },
          });

        if (error) {
          setErrorMessage(
            error.message ?? "An unknown error occurred. Please try again."
          );
        } else if (stripePaymentIntent?.status === "succeeded") {
          setIsModalOpen(true);
        }
      } else {
        throw new Error("Payment intent creation failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again."
      );
    } finally {
      setPaymentProcessing(false);
    }
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
              <td className="py-2">{bookingSummary?.sRoom}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Date:</td>
              <td className="py-2">{bookingSummary?.sDate}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Time:</td>
              <td className="py-2">{bookingSummary?.sTime}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Cost:</td>
              <td className="py-2">${bookingSummary?.sCost}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Name:</td>
              <td className="py-2">{bookingSummary?.sName}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr className="border-gray-300 my-2" />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-2">Email:</td>
              <td className="py-2">{bookingSummary?.sEmail}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <CardElement className="p-4 border rounded-lg" />
        </div>
      </div>

      <button
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        onClick={handleConfirmBooking}
        disabled={paymentProcessing}
      >
        {paymentProcessing ? "Processing..." : "Confirm Booking and Pay"}
      </button>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

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
