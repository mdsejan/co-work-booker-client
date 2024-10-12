// CheckoutPage.tsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "@/pages/MeetingRooms/CheckoutPage";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key);

const CheckoutPageWrapper: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default CheckoutPageWrapper;
