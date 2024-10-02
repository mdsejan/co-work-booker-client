import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetRoomsQuery } from "@/redux/api/api";
import { Room } from "@/types";

const MeetingRooms: React.FC = () => {
  const { data: roomsData = [], isLoading } = useGetRoomsQuery({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [capacityFilter, setCapacityFilter] = useState<number | "">("");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "">("");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(roomsData?.data);

  useEffect(() => {
    setFilteredRooms(roomsData?.data);
  }, [roomsData?.data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Handle search, filter, and sorting logic
  const filterRooms = () => {
    let rooms = roomsData;

    // Filter by search term
    if (searchTerm) {
      rooms = rooms.filter((room: Room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by capacity
    if (capacityFilter) {
      rooms = rooms.filter((room: Room) => room.capacity === capacityFilter);
    }

    // Sort by price
    if (priceSort === "asc") {
      rooms = rooms.sort((a: Room, b: Room) => a.pricePerSlot - b.pricePerSlot);
    } else if (priceSort === "desc") {
      rooms = rooms.sort((a: Room, b: Room) => b.pricePerSlot - a.pricePerSlot);
    }

    setFilteredRooms(rooms);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterRooms();
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCapacityFilter(Number(e.target.value));
    filterRooms();
  };

  const handlePriceSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSort(e.target.value as "asc" | "desc" | "");
    filterRooms();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCapacityFilter("");
    setPriceSort("");
    setFilteredRooms(roomsData);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Column: Search and Filters */}
        <div className="md:col-span-1 bg-white p-4 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Filter Rooms</h2>

          {/* Search Bar */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by room name..."
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Capacity Filter */}
          <select
            value={capacityFilter}
            onChange={handleCapacityChange}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Filter by capacity</option>
            <option value="2">2 People</option>
            <option value="4">4 People</option>
            <option value="6">6 People</option>
            <option value="8">8 People</option>
          </select>

          {/* Price Sort */}
          <select
            value={priceSort}
            onChange={handlePriceSortChange}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Sort by price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          {/* Clear Filters Button */}
          <button
            onClick={handleClearFilters}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          >
            Clear Filters
          </button>
        </div>

        {/* Right Column: Room Listings */}
        <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <p>Loading rooms...</p>
          ) : (
            filteredRooms?.map((room: Room) => (
              <motion.div
                key={room._id}
                className="flex bg-white border rounded-lg p-4"
                whileInView={{ opacity: 1, translateY: 0 }}
                initial={{ opacity: 0, translateY: 20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Room Image */}
                <div className="w-1/3">
                  <img
                    src={room.image || "https://via.placeholder.com/300x200"}
                    alt={room.name}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>

                {/* Room Details */}
                <div className="w-2/3 pl-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{room.name}</h3>
                    <p className="text-gray-600">
                      Capacity: {room.capacity} People
                    </p>
                    <p className="text-gray-600">
                      Price: ${room.pricePerSlot} per slot
                    </p>
                  </div>

                  {/* See Details Button */}
                  <Link to={`/room-details/${room._id}`}>
                    <motion.button className="mt-4 bg-[#14141E] text-white px-4 py-1 rounded-full flex items-center gap-2 group w-fit more-btn">
                      See Details
                      <motion.span className="flex items-center">
                        <FiArrowRight className="arrow" />
                      </motion.span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingRooms;
