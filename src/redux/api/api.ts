import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://co-work-booker.vercel.app/api",
    // baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["Rooms", "Booking", "All-Booking", "RoomSlots", "AllSlots"],
  endpoints: (builder) => ({
    getRoomById: builder.query({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRoomByIdQuery } = baseApi;
