import type { OrderStatus } from "../../mockData/accountData";

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    processing: { label: "Processing", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    shipped: { label: "Shipped", className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
    delivered: { label: "Delivered", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
    const { label, className } = statusConfig[status];
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${className}`}>
            {label}
        </span>
    );
};

export default StatusBadge;
