import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Room } from "@/types";
import { useGetRoomsQuery } from "@/redux/features/room/RoomApi";
import useDebounce from "@/hooks/useDebounceValue";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";

const MeetingRooms: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [capacityFilter, setCapacityFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | "">("");
  const debounceValue = useDebounce(searchTerm);

  const { data: roomsData = [], isLoading } = useGetRoomsQuery({
    search: debounceValue,

    // Handling capacity range
    minCapacity:
      capacityFilter === "20+"
        ? 20
        : capacityFilter
        ? Number(capacityFilter.split("-")[0])
        : undefined,

    maxCapacity:
      capacityFilter === "20+"
        ? undefined
        : capacityFilter.split("-")[1]
        ? Number(capacityFilter.split("-")[1])
        : undefined,

    // Handling price range
    minPrice:
      priceFilter === "5000+"
        ? 5000
        : priceFilter
        ? Number(priceFilter.split("-")[0])
        : undefined,

    maxPrice:
      priceFilter === "5000+"
        ? undefined
        : priceFilter.split("-")[1]
        ? Number(priceFilter.split("-")[1])
        : undefined,

    sortPrice:
      priceSort === "asc"
        ? "priceAsc"
        : priceSort === "desc"
        ? "priceDesc"
        : undefined,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCapacityFilter(e.target.value);
  };

  const handlePriceFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceFilter(e.target.value);
  };

  const handlePriceSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSort(e.target.value as "asc" | "desc" | "");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCapacityFilter("");
    setPriceFilter("");
    setPriceSort("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [debounceValue]);

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
            className="w-full p-2 mb-4 border rounded-md focus:outline-none "
          />

          {/* Capacity Filter */}
          <select
            value={capacityFilter}
            onChange={handleCapacityChange}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Filter by capacity</option>
            <option value="0-4">0-4 People</option>
            <option value="4-8">4-8 People</option>
            <option value="8-12">8-12 People</option>
            <option value="12-20">12-20 People</option>
            <option value="20+">20+ People</option>
          </select>

          {/* Price Range Filter */}
          <select
            value={priceFilter}
            onChange={handlePriceFilterChange}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Filter by price per slot</option>
            <option value="0-2500">0-2500</option>
            <option value="2500-5000">2500-5000</option>
            <option value="5000+">5000+</option>
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
            className="w-full bg-[#279CEB] hover:bg-[#1b87cf] text-white p-2 rounded-md"
          >
            Clear Filters
          </button>
        </div>

        {/* Right Column: Room Listings */}
        <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            roomsData?.data?.map((room: Room) => (
              <motion.div
                key={room._id}
                className="flex h-48 bg-white border rounded-lg p-4"
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
