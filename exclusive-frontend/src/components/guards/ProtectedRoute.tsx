import { Outlet } from "react-router-dom";
import TopBanner from "../../shared/header/TopBanner";
import Navbar from "../../shared/header/Navbar";
import Footer from "../../shared/footer/Footer";
import { useAppSelector } from "../../redux/store";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


export function ProtectedRoute() {
    const token = useAppSelector((state) => state.auth.token?.accessToken);

    if (!token) {
        toast.error("please login first to access this page", { id: "access-error" });
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <TopBanner />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
