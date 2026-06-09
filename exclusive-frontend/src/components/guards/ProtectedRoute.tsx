import { Outlet } from "react-router-dom";
import TopBanner from "../../shared/header/TopBanner";
import Navbar from "../../shared/header/Navbar";
import Footer from "../../shared/footer/Footer";
import { useAppSelector } from "../../redux/store";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


export function ProtectedRoute() {
    const { token, data: user } = useAppSelector((state) => state.auth);

    if (!token.accessToken) {
        toast.error("please login first to access this page", { id: "access-error" });
        return <Navigate to="/login" replace />;
    }

    // if (token.accessToken && !user?.confirmed) {
    //     toast.error("please confirm your email first to access this page", { id: "email-error" });
    //     return <Navigate to={`/verify?email=${user?.email}&type=confirmEmail`} replace />;
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
