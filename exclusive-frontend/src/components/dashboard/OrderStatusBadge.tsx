import type { OrderStatus } from "../../types/dashboard.type";

const statusConfig: Record<OrderStatus, { label: string; classes: string }> = {
  pending: { label: "Pending", classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  processing: { label: "Processing", classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  shipped: { label: "Shipped", classes: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
  delivered: { label: "Delivered", classes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  cancelled: { label: "Cancelled", classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status] ?? statusConfig.pending;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}
