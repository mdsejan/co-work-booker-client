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
    deleteRoom: builder.mutation({
      query: ({ token, roomId }) => ({
        url: `/rooms/${roomId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetRoomsQuery, useDeleteRoomMutation } = RoomApi;
