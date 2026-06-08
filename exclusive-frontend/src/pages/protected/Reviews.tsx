import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { reviewsData } from "../../mockData/accountData";
import type { AdminReview, ReviewStatus } from "../../types/dashboard.type";
import { reviewSchema } from "../../schema/user/user.validation";
import type { ReviewFormType } from "../../schema/user/user.dto";
import ReviewCard from "../../components/account/ReviewCard";
import FormTextarea from "../../components/form/FormTextarea";
import LoadingButton from "../../components/loading/LoadingButton";

const statusFilters: { label: string; value: ReviewStatus | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Published", value: "published" },
    { label: "Rejected", value: "rejected" },
];

const Reviews = () => {
    const [reviews, setReviews] = useState<Partial<AdminReview>[]>(reviewsData); // get Reviews from API
    const [editingReview, setEditingReview] = useState<Partial<AdminReview> | null>(null);
    const [activeFilter, setActiveFilter] = useState<ReviewStatus | "all">("all");

    const filteredReviews = activeFilter === "all" ? reviews : reviews.filter((r) => r.status === activeFilter);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm<ReviewFormType>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: 0, comment: "" },
    });

    const currentRating = watch("rating");

    // handlers
    const handleEdit = (review: AdminReview) => {
        setEditingReview(review);
        setValue("rating", review.rating);
        setValue("comment", review.comment);
    };

    const handleDelete = (id: string) => {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        // TODO: API  DELETE /reviews/:id
    };

    const handleCancel = () => {
        setEditingReview(null);
        reset({ rating: 0, comment: "" });
    };

    const onSubmit: SubmitHandler<ReviewFormType> = async (data) => {
        if (!editingReview) return;

        setReviews((prev) =>
            prev.map((r) =>
                r.id === editingReview.id
                    ? { ...r, rating: data.rating, comment: data.comment }
                    : r
            )
        );
        // TODO: API  PUT /reviews/:editingReview.id  { rating: data.rating, comment: data.comment }

        handleCancel();
    };

    return (
        <div className="shadow-md rounded-md p-6">
            <h2 className="font-semibold text-lg text-primary mb-6">My Reviews</h2>

            {/* Status filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {statusFilters.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeFilter === filter.value
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Edit form (inline)  */}
            {editingReview && (
                <div className="mb-6 border border-primary/30 rounded-lg p-5 bg-primary/5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-sm">
                            Editing review for{" "}
                            <span className="text-primary">{editingReview.productTitle}</span>
                        </h3>
                        <button onClick={handleCancel} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer" aria-label="Close">
                            <X size={18} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Star rating */}
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Rating</p>
                            <Rating
                                initialValue={currentRating}
                                onClick={(val) => setValue("rating", val, { shouldValidate: true })}
                                size={28}
                                allowFraction
                                SVGclassName="inline-block" />
                            {errors.rating && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.rating.message}
                                </p>
                            )}
                        </div>

                        {/* Comment textarea */}
                        <FormTextarea
                            name="comment"
                            placeholder="Write your review here…"
                            register={register}
                            errors={errors}
                        />

                        <div className="flex gap-3 mt-4">
                            <LoadingButton isSubmitting={isSubmitting} text="Save Review" />
                            <button type="button" onClick={handleCancel} className="border border-gray-300 dark:border-gray-600 px-6 py-2 rounded hover:border-primary hover:text-primary transition-colors text-sm cursor-pointer">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/*  Review list  */}
            {filteredReviews.length > 0 ? (
                <div className="space-y-4">
                    {filteredReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review as AdminReview}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No reviews found for this status.</p>
                </div>
            )}
        </div>
    );
};

export default Reviews;