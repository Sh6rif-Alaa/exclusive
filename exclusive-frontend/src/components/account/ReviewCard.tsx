import { Rating } from "react-simple-star-rating";
import { Trash2, Edit2, Clock, CheckCircle, XCircle } from "lucide-react";
import type { ReviewCardProps } from "../../types/account.type";
import type { ReviewStatus } from "../../types/dashboard.type";
import Image from "../home/Image";

const reviewStatusConfig: Record<ReviewStatus, { label: string; icon: React.ElementType; className: string }> = {
    pending: {
        label: "Pending Review",
        icon: Clock,
        className: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
    },
    published: {
        label: "Published",
        icon: CheckCircle,
        className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    },
    rejected: {
        label: "Rejected",
        icon: XCircle,
        className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
    },
};

const ReviewCard = ({ review, onEdit, onDelete }: ReviewCardProps) => {
    const statusCfg = reviewStatusConfig[review.status ?? "pending"];
    const StatusIcon = statusCfg.icon;

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex gap-4">
            <Image src={review.productImage} alt={review.productTitle} skeleton={true} className="w-16 h-16 object-contain bg-gray-100 dark:bg-gray-700 rounded shrink-0" />
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{review.productTitle}</h4>
                    <div className="flex gap-1 shrink-0 items-center">
                        {/* Status badge */}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${statusCfg.className}`}>
                            <StatusIcon size={11} />
                            {statusCfg.label}
                        </span>
                        {/* Actions — only editable when pending or published */}
                        {review.status !== "rejected" && (
                            <button
                                onClick={() => onEdit(review)}
                                className="p-1.5 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                                aria-label="Edit review">
                                <Edit2 size={14} />
                            </button>
                        )}
                        <button
                            onClick={() => onDelete(review.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            aria-label="Delete review">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
                <Rating readonly initialValue={review.rating} size={16} allowFraction SVGclassName="inline-block" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{review.comment}</p>
                {review.status === "rejected" && (
                    <p className="text-xs text-red-500 mt-1.5 italic">This review was not approved by our team.</p>
                )}
                <p className="text-xs text-gray-400 mt-2">{review.date}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
