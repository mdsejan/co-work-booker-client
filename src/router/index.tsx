import MainLayout from "@/components/Layouts/MainLayouts";
import AboutUs from "@/pages/AboutUs";
import ContactUsPage from "@/pages/ContactUsPage";
import Home from "@/pages/Home/Home";
import MeetingRooms from "@/pages/MeetingRooms/MeetingRooms";
import RoomDetails from "@/pages/MeetingRooms/RoomDetails";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

import NotFound from "@/pages/shared/NotFound";
import TermsOfService from "@/pages/TermsOfService";
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
        element: <RoomDetails />,
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
