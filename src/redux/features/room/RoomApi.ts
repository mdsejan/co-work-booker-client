import { baseApi } from "@/redux/api/api";

const RoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: ({
        search,
        minCapacity,
        maxCapacity,
        minPrice,
        maxPrice,
        sortPrice,
      }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (minCapacity) params.append("minCapacity", minCapacity.toString());
        if (maxCapacity) params.append("maxCapacity", maxCapacity.toString());
        if (minPrice) params.append("minPrice", minPrice.toString());
        if (maxPrice) params.append("maxPrice", maxPrice.toString());
        if (sortPrice) params.append("sortPrice", sortPrice);

        return {
          url: `/rooms?${params.toString()}`,
          method: "GET",
        };
      },
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
