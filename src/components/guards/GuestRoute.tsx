import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export function GuestRoute() {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
