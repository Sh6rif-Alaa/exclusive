import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { reviewsData as initialReviews, type Review } from "../../data/accountData";
import { reviewSchema } from "../../schema/user/user.validation";
import type { ReviewFormType } from "../../schema/user/user.dto";
import ReviewCard from "../../components/account/ReviewCard";
import FormTextarea from "../../components/form/FormTextarea";

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [editingReview, setEditingReview] = useState<Review | null>(null);

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
    const handleEdit = (review: Review) => {
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
                            <button type="submit" disabled={isSubmitting} className="bg-primary text-white px-6 py-2 rounded hover:bg-red-600 transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer">
                                {isSubmitting ? "Saving…" : "Save Review"}
                            </button>
                            <button type="button" onClick={handleCancel} className="border border-gray-300 dark:border-gray-600 px-6 py-2 rounded hover:border-primary hover:text-primary transition-colors text-sm cursor-pointer">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── Review list ── */}
            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">You haven't written any reviews yet.</p>
                </div>
            )}
        </div>
    );
};

export default Reviews;
