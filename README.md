# CoWorkBooker

### Live URL: &nbsp; &nbsp; [deploy.soon](https://#/)

## Description:

CoWorkBooker is a web application designed to manage room reservations for co-working spaces. It provides a streamlined booking process for both administrators and users, ensuring efficient management of meeting rooms and time slots.

### Admin Actions:

Administrators have comprehensive control over the co-working space inventory:

- Create, update, and delete rooms with details such as name, number, floor, capacity, price per slot, and amenities.
- Manage time slots for each room, setting dates, start times, and end times to ensure availability.

### User Interactions:

Users can effortlessly book rooms for their meetings:

- Select available time slots on desired dates.
- Input booking details including room selection and preferred slots.
- Automatically calculate total costs based on slots chosen and prices per slot.
- Receive real-time updates on room and slot availability to avoid conflicts.

## Features

- **User Management**: Enable users to sign up, log in, and manage their accounts securely.
- **Room Management**: Allow admins to add, update, delete, and view co-working rooms.
- **Slot Management**: Enable admins to create, update, and delete time slots for room bookings.
- **Booking Management**: Facilitate users in creating, viewing, and canceling bookings.
- **Availability Check**: Provide endpoints to check slot availability for specific dates.
- **Error Handling**: Implement robust error handling middleware for consistent and informative responses.
- **Authentication & Authorization**: Secure API endpoints using JWT-based authentication and role-based authorization.
- **Data Validation**: Ensure data integrity and consistency with Zod for input validation.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mdsejan/co-work-booker-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CoWorkBooker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

Start the server:

```bash
npm run dev
```

The server will start running at `http://localhost:5173/`.
