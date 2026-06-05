import { useState } from "react";
import { ordersData } from "../../mockData/accountData";
import OrderCard from "../../components/account/OrderCard";
import type { OrderStatus } from "../../types/dashboard.type";

const statusFilters: { label: string; value: OrderStatus | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
];

const Orders = () => {
    const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all");

    const filteredOrders = activeFilter === "all" ? ordersData : ordersData.filter((order) => order.status === activeFilter);

    return (
        <div className="shadow-md rounded-md p-6">
            <h2 className="font-semibold text-lg text-primary mb-6">My Orders</h2>

            {/* Status filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {statusFilters.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeFilter === filter.value
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {filteredOrders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No orders found for this status.</p>
                </div>
            )}
        </div>
    );
};

export default Orders;
