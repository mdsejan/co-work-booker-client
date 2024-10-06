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

    createRoom: builder.mutation({
      query: ({ token, roomData }) => ({
        url: "/rooms",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: roomData,
      }),
      invalidatesTags: ["Rooms"],
    }),

    updateRoom: builder.mutation({
      query: ({ roomId, token, roomData }) => ({
        url: `/rooms/${roomId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: roomData,
      }),
      invalidatesTags: ["Rooms"],
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

export const {
  useGetRoomsQuery,
  useDeleteRoomMutation,
  useCreateRoomMutation,
  useUpdateRoomMutation,
} = RoomApi;
