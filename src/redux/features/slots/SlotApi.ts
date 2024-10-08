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
  useAllSlotsQuery,
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} = SlotApi;
