import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import type { IUser, Token } from "../../types/user.type";
import toast from "react-hot-toast";

export function AdminRoute() {
  // const { token, data: user } = useAppSelector((state) => state.auth) as { token: Token, data: IUser };

  // if (!token?.accessToken && user?.role !== "admin") {
  //   toast.error("you are not authorized to access this page", { id: "admin-error" });
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
}
