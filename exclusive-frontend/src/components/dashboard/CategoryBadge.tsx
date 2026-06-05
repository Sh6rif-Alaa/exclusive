import type { AdminCategory } from "../../types/dashboard.type";

const CategoryBadge = ({ status }: { status: AdminCategory["status"] }) => {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === "active"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    )
}

export default CategoryBadge