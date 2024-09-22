import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://co-work-booker.vercel.app/api",
  }),
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),

      providesTags: ["Rooms"],
    }),
  }),
});

export const { useGetRoomsQuery } = baseApi;
