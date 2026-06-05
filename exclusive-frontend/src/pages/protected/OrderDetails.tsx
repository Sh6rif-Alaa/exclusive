import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard } from "lucide-react";
import { ordersData } from "../../mockData/accountData";
import StatusBadge from "../../components/account/StatusBadge";
import type { AdminOrder, OrderItem } from "../../types/dashboard.type";
import Image from "../../components/home/Image";

const infoBlocks = (order: NonNullable<ReturnType<typeof ordersData.find>>) => [
    { label: "Order Number", value: order.orderNumber },
    { label: "Order Date", value: order.date },
    { label: "Payment", value: order.paymentMethod },
];

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const order = ordersData.find((o) => o.id === id) as AdminOrder;

    if (!order) {
        return (
            <div className="shadow-md rounded-md p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Order not found.</p>
                <Link to="/orders" className="text-primary hover:underline text-sm">
                    ← Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="shadow-md rounded-md p-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                    <Link
                        to="/orders"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors mb-2">
                        <ArrowLeft size={14} /> Back to Orders
                    </Link>
                    <h2 className="font-semibold text-lg text-primary">Order Details</h2>
                </div>
                <StatusBadge status={order.status} />
            </div>

            {/* Order meta */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                {infoBlocks(order).map((info) => (
                    <div key={info.label}>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{info.label}</p>
                        <p className="font-medium text-sm mt-0.5">{info.value}</p>
                    </div>
                ))}
            </div>

            {/* Items */}
            <h3 className="font-semibold mb-3 text-sm">Items Ordered</h3>
            <ul className="space-y-3 mb-6">
                {(order.items as OrderItem[]).map((item: OrderItem) => (
                    <li key={item.id} className="flex items-center gap-4 p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                        <Image src={item.image} alt={item.title} skeleton={true} className="w-14 h-14 object-contain bg-gray-100 dark:bg-gray-700 rounded shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                        </div>
                        <span className="font-semibold text-primary shrink-0"> ${(item.price * item.quantity).toFixed(2)} </span>
                    </li>
                ))}
            </ul>

            {/* Totals */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 mb-6">
                {[
                    { label: "Subtotal", value: `$${order.total.toFixed(2)}` },
                    { label: "Shipping", value: "Free" },
                ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{label}</span>
                        <span>{value}</span>
                    </div>
                ))}
                <div className="flex justify-between font-bold border-t border-gray-200 dark:border-gray-700 pt-3 mt-1">
                    <span>Total</span>
                    <span className="text-primary">${order.total.toFixed(2) || 0}</span>
                </div>
            </div>

            {/* Billing & Payment */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin size={14} className="text-primary" />
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Billing Address
                        </p>
                    </div>
                    <p className="text-sm">{order.billingAddress}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <CreditCard size={14} className="text-primary" />
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Payment Method
                        </p>
                    </div>
                    <p className="text-sm">{order.paymentMethod}</p>
                </div>
            </div>

            {/* Actions */}
            <Link to={`/track-order/${order.id}`} className="inline-block bg-primary text-white px-6 py-2.5 rounded hover:bg-red-600 transition-colors text-sm font-medium">
                Track This Order
            </Link>
        </div>
    );
};

export default OrderDetails;
