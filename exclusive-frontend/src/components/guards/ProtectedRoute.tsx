import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import TopBanner from "../../shared/header/TopBanner";
import Navbar from "../../shared/header/Navbar";
import Footer from "../../shared/footer/Footer";


export function ProtectedRoute() {
    // const token = useAppSelector((state) => state.auth.token);

    // if (!token) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <>
            <TopBanner />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
