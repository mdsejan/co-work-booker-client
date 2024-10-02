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
  }),
  overrideExisting: false,
});

export const { useBookingsQuery } = bookingApi;
