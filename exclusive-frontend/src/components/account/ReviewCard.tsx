import { Rating } from "react-simple-star-rating";
import { Trash2, Edit2 } from "lucide-react";
import type { ReviewCardProps } from "../../types/account.type";

const ReviewCard = ({ review, onEdit, onDelete }: ReviewCardProps) => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex gap-4">
            <img src={review.productImage} alt={review.productTitle} className="w-16 h-16 object-contain bg-gray-100 dark:bg-gray-700 rounded shrink-0" />
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{review.productTitle}</h4>
                    <div className="flex gap-1 shrink-0">
                        <button
                            onClick={() => onEdit(review)}
                            className="p-1.5 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                            aria-label="Edit review">
                            <Edit2 size={14} />
                        </button>
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
                <p className="text-xs text-gray-400 mt-2">{review.date}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
