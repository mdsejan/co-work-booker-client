import MainLayout from "@/components/Layouts/MainLayouts";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import AboutUs from "@/pages/AboutUs";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ContactUsPage from "@/pages/ContactUsPage";
import Home from "@/pages/Home/Home";
import LoginPage from "@/pages/LoginPage";
import MeetingRooms from "@/pages/MeetingRooms/MeetingRooms";
import RoomDetails from "@/pages/MeetingRooms/RoomDetails";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

import NotFound from "@/pages/shared/NotFound";
import TermsOfService from "@/pages/TermsOfService";
import MyBookings from "@/pages/user/myBookings";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/meeting-rooms",
        element: <MeetingRooms />,
      },
      {
        path: "/room-details/:id",
        element: (
          <ProtectedRoute>
            <RoomDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/my-bookings",
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
