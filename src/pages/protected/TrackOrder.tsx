import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { ordersData, getTrackingSteps } from "../../data/accountData";
import TrackStep from "../../components/account/TrackStep";
import StatusBadge from "../../components/account/StatusBadge";

const TrackOrder = () => {
    const { id } = useParams<{ id: string }>();
    const order = ordersData.find((o) => o.id === id);

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

    const steps = getTrackingSteps(order.status);

    return (
        <div className="shadow-md rounded-md p-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                    <Link
                        to={`/order-details/${order.id}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors mb-2"
                    >
                        <ArrowLeft size={14} /> Back to Order Details
                    </Link>
                    <h2 className="font-semibold text-lg text-primary">Track Order</h2>
                </div>
                <StatusBadge status={order.status} />
            </div>

            {/* Order summary card */}
            <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                        <Package size={20} className="text-primary" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Order Number</p>
                        <p className="font-semibold text-sm">{order.orderNumber}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Order Date</p>
                    <p className="font-semibold text-sm">{order.date}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Delivery</p>
                    <p className="font-semibold text-sm">Jun 10, 2026</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                    <p className="font-semibold text-sm text-primary">${order.total.toFixed(2)}</p>
                </div>
            </div>

            {/* Tracking timeline */}
            <div>
                {steps.map((step, index) => (
                    <TrackStep key={step.id} step={step} isLast={index === steps.length - 1} />
                ))}
            </div>
        </div>
    );
};

export default TrackOrder;
