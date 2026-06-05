import { Link } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";
import type { Order } from "../../mockData/accountData";
import StatusBadge from "./StatusBadge";

const OrderCard = ({ order }: { order: Order }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                        <Package size={18} className="text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{order.orderNumber}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{order.date}</p>
                    </div>
                </div>
                <StatusBadge status={order.status} />
            </div>

            {/* Product thumbnails */}
            <div className="flex gap-2 mb-4">
                {order.items.slice(0, 3).map((item) => (
                    <img key={item.id} src={item.image} alt={item.title} className="size-12 object-contain bg-gray-100 dark:bg-gray-700 rounded" />
                ))}
                {order.items.length > 3 && (
                    <div className="size-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-medium text-gray-500">
                        +{order.items.length - 3}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="font-semibold text-primary">${order.total.toFixed(2)}</span>
                <div className="flex gap-2">
                    <Link
                        to={`/track-order/${order.id}`}
                        className="text-xs border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded hover:border-primary hover:text-primary transition-colors">
                        Track
                    </Link>
                    <Link
                        to={`/order-details/${order.id}`}
                        className="text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-red-600 transition-colors flex items-center gap-1">
                        Details <ChevronRight size={12} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
