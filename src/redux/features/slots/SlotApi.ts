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
    createSlot: builder.mutation({
      query: ({ token, slotData }) => ({
        url: "/slots",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: slotData,
      }),
      invalidatesTags: ["AllSlots", "RoomSlots"],
    }),
  }),
  overrideExisting: false,
});

export const { useRoomSlotsQuery, useAllSlotsQuery, useCreateSlotMutation } =
  SlotApi;
