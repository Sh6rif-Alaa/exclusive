import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import TopBanner from "../header/TopBanner";

const MainLayout = () => {
  return (
    <>
      <TopBanner />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
