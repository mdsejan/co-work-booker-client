export interface Room {
  _id: string;
  image?: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
}

export interface Slot {
  _id: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Booking {
  _id: string;
  room: Room;
  slots: Slot[];
  date: string;
  totalAmount: number;
  isConfirmed: string;
  isDeleted: boolean;
}

export interface BookingResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Booking[];
}
