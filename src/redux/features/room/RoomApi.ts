import { baseApi } from "@/redux/api/api";

const RoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),

      providesTags: ["Rooms"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetRoomsQuery } = RoomApi;
