import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, Settings, LogOut, ChevronRight, BarChart2, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/slice/authSlice";
import ThemeToggle from "../header/ThemeToggle";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/reviews", label: "Reviews", icon: MessageCircle },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.data);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900 font-poppins">
      {/*  Mobile overlay  */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/*  Sidebar  */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 shadow-sm transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-slate-700">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">Exclusive</span>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 ml-1 uppercase tracking-widest">
              Admin
            </span>
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-primary transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={18}
                    className={isActive ? "text-primary" : ""}
                  />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight size={14} className="text-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 space-y-3">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-700">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
                {user?.firstName?.charAt(0) ?? "A"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate dark:text-white">
                  {user?.firstName}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-primary transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/*  Main area  */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-primary transition-colors cursor-pointer"
          >
            <Menu size={22} />
          </button>

          <div className="flex-1 lg:flex-none">
            <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              Welcome back,{" "}
              <span className="font-semibold text-gray-800 dark:text-white">
                {user?.firstName ?? "Admin"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
