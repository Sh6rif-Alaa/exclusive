import type { AdminReview, ReviewStatus } from "../../types/dashboard.type";
import { Rating } from "react-simple-star-rating";
import ReviewStatusBadge from "./ReviewStatusBadge";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import Image from "../home/Image";

const ReviewRow = ({ review, onUpdate }: { review: AdminReview; onUpdate: (id: string, s: ReviewStatus) => void }) => {
    return (
        <div className="flex gap-4 p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
            {/* Product image */}
            <div className="size-12 rounded-lg bg-gray-100 dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                <Image src={review.productImage} alt={review.productTitle} skeleton={true} className="w-full h-full object-contain"/>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                        <p className="font-medium text-sm text-gray-800 dark:text-white truncate">{review.productTitle}</p>
                        <p className="text-xs text-gray-400">{review.customerName} · {review.customerEmail}</p>
                    </div>
                    <ReviewStatusBadge status={review.status} />
                </div>
                <div className="flex items-center gap-0.5">
                    <Rating
                        readonly
                        initialValue={review.rating}
                        size={12}
                        allowFraction
                        SVGclassName="inline-block"
                    />
                    <span className="text-xs text-gray-400 ml-1">{review.rating}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{review.date}</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 shrink-0 justify-center">
                {review.status !== "published" && (
                    <button
                        onClick={() => onUpdate(review.id, "published")}
                        title="Publish"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
                    >
                        <CheckCircle size={13} /> Publish
                    </button>
                )}
                {review.status !== "rejected" && (
                    <button
                        onClick={() => onUpdate(review.id, "rejected")}
                        title="Reject"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
                    >
                        <XCircle size={13} /> Reject
                    </button>
                )}
                {review.status !== "pending" && (
                    <button
                        onClick={() => onUpdate(review.id, "pending")}
                        title="Set Pending"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors cursor-pointer"
                    >
                        <Clock size={13} /> Pending
                    </button>
                )}
            </div>
        </div>
    );
}

export default ReviewRow