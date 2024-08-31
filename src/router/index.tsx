import MainLayout from "@/components/Layouts/MainLayouts";
import AboutUs from "@/pages/AboutUs";
import Home from "@/pages/Home/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

import NotFound from "@/pages/shared/NotFound";
import TermsOfService from "@/pages/TermsOfService";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
