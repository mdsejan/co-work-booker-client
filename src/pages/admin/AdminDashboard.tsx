import { useEffect, useState } from "react";
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRooms: 0,
    totalSlots: 0,
    bookedRooms: 0,
  });

  useEffect(() => {
    const demoData = {
      totalUsers: 150,
      totalBookings: 75,
      totalRooms: 20,
      totalSlots: 100,
      bookedRooms: 15,
    };

    const fetchDashboardData = () => {
      setTimeout(() => {
        setDashboardData(demoData);
      }, 500);
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-8 min-h-[70vh]">
      <div>
        {/* Welcome Message */}
        <h2 className="text-3xl font-semibold mb-12">
          Welcome to the Admin Dashboard!
        </h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded border-2 p-4 text-center">
            <h3 className="text-lg  text-blue-500 mb-4 font-semibold">
              Total Users
            </h3>
            <p className="text-2xl">{dashboardData.totalUsers}</p>
          </div>
          <div className="bg-white rounded border-2 p-4 text-center">
            <h3 className="text-lg  text-blue-500 mb-4 font-semibold">
              Total Bookings
            </h3>
            <p className="text-2xl">{dashboardData.totalBookings}</p>
          </div>
          <div className="bg-white rounded border-2 p-4 text-center">
            <h3 className="text-lg  text-blue-500 mb-4 font-semibold">
              Total Rooms
            </h3>
            <p className="text-2xl">{dashboardData.totalRooms}</p>
          </div>
          <div className="bg-white rounded border-2 p-4 text-center">
            <h3 className="text-lg  text-blue-500 mb-4 font-semibold">
              Total Slots
            </h3>
            <p className="text-2xl">{dashboardData.totalSlots}</p>
          </div>
          <div className="bg-white rounded border-2 p-4 text-center">
            <h3 className="text-lg  text-blue-500 mb-4 font-semibold">
              Booked Rooms
            </h3>
            <p className="text-2xl">{dashboardData.bookedRooms}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
