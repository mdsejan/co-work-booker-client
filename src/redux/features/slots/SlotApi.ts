import { baseApi } from "@/redux/api/api";

const SlotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    roomSlots: builder.query({
      query: ({ roomId, date }) => ({
        url: `/slots/availability?date=${date}&roomId=${roomId}`,
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

    availableDates: builder.query({
      query: (roomId) => ({
        url: `/slots/dates/${roomId}`,
        method: "GET",
      }),
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

    updateSlot: builder.mutation({
      query: ({ slotId, token, slotData }) => ({
        url: `/slots/${slotId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: slotData,
      }),
      invalidatesTags: ["AllSlots", "RoomSlots"],
    }),

    deleteSlot: builder.mutation({
      query: ({ token, slotId }) => ({
        url: `/slots/${slotId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["AllSlots", "RoomSlots"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRoomSlotsQuery,
  useLazyRoomSlotsQuery,
  useAllSlotsQuery,
  useAvailableDatesQuery,
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} = SlotApi;
