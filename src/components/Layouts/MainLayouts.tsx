import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar isAuthenticated={true} isAdmin={false} />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};
export default MainLayout;
