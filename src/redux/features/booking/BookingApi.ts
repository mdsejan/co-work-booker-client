import { baseApi } from "@/redux/api/api";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ token, bookingData }) => ({
        url: "/bookings",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: bookingData,
      }),
    }),

    paymentIntent: builder.mutation({
      query: ({ token, amount }) => ({
        url: "/bookings/paymentintent",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: amount,
      }),
    }),

    bookings: builder.query({
      query: (token) => ({
        url: "/my-bookings",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Booking"],
    }),

    allBookings: builder.query({
      query: (token) => ({
        url: "/bookings",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["All-Booking"],
    }),

    approveBooking: builder.mutation({
      query: ({ bookingId, token, bookingData }) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: bookingData,
      }),
      invalidatesTags: ["Booking", "All-Booking"],
    }),

    deleteBooking: builder.mutation({
      query: ({ token, bookingId }) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Booking", "All-Booking"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBookingMutation,
  usePaymentIntentMutation,
  useBookingsQuery,
  useAllBookingsQuery,
  useDeleteBookingMutation,
  useApproveBookingMutation,
} = bookingApi;
