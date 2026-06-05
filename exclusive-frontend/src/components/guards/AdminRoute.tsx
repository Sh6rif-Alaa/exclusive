import { Outlet } from "react-router-dom";

export function AdminRoute() {
  // const { token, user } = useAppSelector((state) => state.auth);

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (user?.role !== "admin") {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
}
