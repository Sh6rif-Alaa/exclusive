import Navbar from "./subComponents/Navbar/Navbar";
import Footer from "./subComponents/Footer/Footer";
import { Outlet } from "react-router-dom";
import TopBanner from "./subComponents/TopBanner/TopBanner";

const Layout = () => {
  return (
    <>
      <TopBanner />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
