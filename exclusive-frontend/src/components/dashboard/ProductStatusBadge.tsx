import type { AdminProduct } from "../../types/dashboard.type";

const STATUS_CFG = {
    active: {
        label: "Active",
        classes:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    draft: {
        label: "Draft",
        classes:
            "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300",
    },
    out_of_stock: {
        label: "Out of Stock",
        classes:
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
} as const;

const ProductStatusBadge = ({ status }: { status: AdminProduct["status"] }) => {
    const cfg = STATUS_CFG[status];
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.classes}`}
        >
            {cfg.label}
        </span>
    );
}

export default ProductStatusBadge