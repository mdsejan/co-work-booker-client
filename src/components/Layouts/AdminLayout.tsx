import { Outlet, NavLink, Link } from "react-router-dom";
import { FiHome, FiGrid, FiCalendar, FiMenu, FiX } from "react-icons/fi";
import { GiTimeTrap } from "react-icons/gi";
import { useState } from "react";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#1C2434] text-[#DEE4EE] w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out z-20 md:translate-x-0`}
      >
        {/* Brand/Logo */}
        <Link to="/">
          <div className="text-2xl font-bold text-center py-4">
            <img
              src="https://i.pinimg.com/originals/f5/f6/ba/f5f6baab0c0d76671641c041321de894.gif"
              alt="Logo GIF"
              className="mx-auto rounded-full mb-2 w-14 h-14 object-cover"
            />
            <h3>AdminPanel</h3>
          </div>
        </Link>

        {/* Sidebar Menu */}
        <nav className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg hover:bg-[#333A48] ${
                isActive ? "bg-[#333A48]" : ""
              }`
            }
          >
            <FiGrid className="mr-3" /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/manage-rooms"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg hover:bg-[#333A48] ${
                isActive ? "bg-[#333A48]" : ""
              }`
            }
          >
            <FiHome className="mr-3" /> Manage Rooms
          </NavLink>
          <NavLink
            to="/admin/manage-slots"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg hover:bg-[#333A48] ${
                isActive ? "bg-[#333A48]" : ""
              }`
            }
          >
            <GiTimeTrap className="mr-3" /> Manage Slots
          </NavLink>
          <NavLink
            to="/admin/manage-booking"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg hover:bg-[#333A48] ${
                isActive ? "bg-[#333A48]" : ""
              }`
            }
          >
            <FiCalendar className="mr-3" /> Manage Bookings
          </NavLink>
        </nav>

        {/* Home Link */}
        <div className="px-4 py-6 bg-[#24303F]">
          <NavLink
            to="/"
            className="flex justify-center items-center px-4 py-2 rounded-lg hover:bg-[#4759df] bg-[#3C50E0]"
          >
            Home
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 h-screen overflow-y-auto bg-[#F1F5F9] p-8">
        {/* Toggle Button (Mobile and Tablet) */}
        <div className="lg:hidden flex justify-between items-center mb-4 absolute right-4 top-4">
          <button
            onClick={toggleSidebar}
            className="text-[#1C2434] focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Scrollable Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
