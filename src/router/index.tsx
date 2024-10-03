import AdminLayout from "@/components/Layouts/AdminLayout";
import AdminProtectedRoute from "@/components/Layouts/AdminProtectedRoute";
import MainLayout from "@/components/Layouts/MainLayouts";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import AboutUs from "@/pages/AboutUs";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageBooking from "@/pages/admin/ManageBooking";
import ManageRooms from "@/pages/admin/ManageRooms";
import ManageSlots from "@/pages/admin/ManageSlots";
import ContactUsPage from "@/pages/ContactUsPage";
import Home from "@/pages/Home/Home";
import LoginPage from "@/pages/LoginPage";
import MeetingRooms from "@/pages/MeetingRooms/MeetingRooms";
import RoomDetails from "@/pages/MeetingRooms/RoomDetails";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

import NotFound from "@/pages/shared/NotFound";
import SignupPage from "@/pages/SignUp";
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
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/my-bookings",
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: (
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "manage-rooms",
        element: (
          <AdminProtectedRoute>
            <ManageRooms />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "manage-slots",
        element: (
          <AdminProtectedRoute>
            <ManageSlots />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "manage-booking",
        element: (
          <AdminProtectedRoute>
            <ManageBooking />
          </AdminProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
