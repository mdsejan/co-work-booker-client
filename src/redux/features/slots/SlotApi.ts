import { baseApi } from "@/redux/api/api";

const SlotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    roomSlots: builder.query({
      query: (id) => ({
        url: `/slots/availability?roomId=${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRoomSlotsQuery } = SlotApi;
