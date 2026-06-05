import type { ReviewStatus } from "../../types/dashboard.type";

const statusCfg: Record<ReviewStatus, { label: string; classes: string }> = {
    pending: { label: "Pending", classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
    published: { label: "Published", classes: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    rejected: { label: "Rejected", classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

const ReviewStatusBadge = ({ status }: { status: ReviewStatus }) => {
    const cfg = statusCfg[status];
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.classes}`}>
            {cfg.label}
        </span>
    );
}

export default ReviewStatusBadge