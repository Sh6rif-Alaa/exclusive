import { NavLink, Outlet } from "react-router-dom";
import { User, PackageOpen, Star, CreditCard, MapPin } from "lucide-react";
import Breadcrumb from "../header/Breadcrumb";

const sidebarLinks = [
    { to: "/user-account", label: "My Profile", icon: User },
    { to: "/orders", label: "My Orders", icon: PackageOpen },
    { to: "/reviews", label: "My Reviews", icon: Star },
    { to: "/payment-methods", label: "My Payment Options", icon: CreditCard },
    { to: "/address-book", label: "Address Book", icon: MapPin },
];

const AccountLayout = () => {
    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "My Account" },
                ]}
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                <h3 className="font-semibold text-lg">
                                    Manage My Account
                                </h3>
                            </div>
                            <ul className="[&_li]:px-4 [&_li]:py-3 [&_li]:cursor-pointer [&_li]:transition-colors [&_li]:border-b [&_li]:border-gray-100 dark:[&_li]:border-gray-700 last:[&_li]:border-0">
                                {sidebarLinks.map((link) => (
                                    <li key={link.to}>
                                        <NavLink to={link.to} className={({ isActive }) =>
                                            `flex items-center gap-3 transition-colors ${isActive ? "text-primary font-medium" : "text-gray-600 dark:text-gray-400 hover:text-primary"}`
                                        } >
                                            {({ isActive }) => (
                                                <>
                                                    <link.icon size={18} className={isActive ? "text-primary" : ""} />
                                                    <span>{link.label}</span>
                                                </>
                                            )}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Outlet />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AccountLayout;
