import { baseApi } from "@/redux/api/api";

const SlotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    roomSlots: builder.query({
      query: (id) => ({
        url: `/slots/availability?roomId=${id}`,
        method: "GET",
      }),
      providesTags: ["RoomSlots"],
    }),
    allSlots: builder.query({
      query: () => ({
        url: `/slots/availability`,
        method: "GET",
      }),
      providesTags: ["AllSlots"],
    }),
  }),
  overrideExisting: false,
});

export const { useRoomSlotsQuery, useAllSlotsQuery } = SlotApi;
