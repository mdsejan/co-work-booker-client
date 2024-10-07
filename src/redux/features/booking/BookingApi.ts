import { baseApi } from "@/redux/api/api";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      invalidatesTags: ["All-Booking", "Booking"],
    }),

    deleteBooking: builder.mutation({
      query: ({ token, bookingId }) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["All-Booking"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBookingsQuery,
  useAllBookingsQuery,
  useDeleteBookingMutation,
  useApproveBookingMutation,
} = bookingApi;
