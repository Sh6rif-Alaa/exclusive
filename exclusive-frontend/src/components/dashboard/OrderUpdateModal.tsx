import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Plus, Trash2, X } from "lucide-react";
import type { ModalProps, OrderItem, OrderStatus } from "../../types/dashboard.type";
import { formatMoney } from "../../helpers/dashboard.helper";
import { orderUpdateSchema } from "../../schema/dashboard/dashboard.validation";
import type { OrderUpdateFormType } from "../../schema/dashboard/dashboard.dto";

const STATUS_OPTIONS: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

export function OrderUpdateModal({ order, tracking: initialTracking, onClose, onSave }: ModalProps) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<OrderUpdateFormType>({
        resolver: zodResolver(orderUpdateSchema),
        defaultValues: {
            status: order.status,
            tracking: initialTracking,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tracking",
    });

    const currentStatus = watch("status");
    const trackingValues = watch("tracking");

    const addStep = () => {
        append({
            id: String(Date.now()),
            title: "",
            description: "",
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
            completed: false,
            current: false,
        });
    };

    const toggleCompleted = (index: number) => {
        setValue(`tracking.${index}.completed`, !trackingValues[index]?.completed, {
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<OrderUpdateFormType> = async (data) => {
        await new Promise((r) => setTimeout(r, 500)); // simulate API
        onSave(order.id, data.status, data.tracking);
        onClose();
        // TODO: API  PUT /api/admin/orders/:order.id  { status: data.status, tracking: data.tracking }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700 shrink-0">
                    <div>
                        <h2 className="font-bold text-gray-900 dark:text-white text-base">Update Order</h2>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">{order.orderNumber}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="overflow-y-auto flex-1 px-6 py-5 space-y-6"
                >
                    {/* Customer info */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <div className="size-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {order.customerName.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium text-sm text-gray-800 dark:text-white">{order.customerName}</p>
                            <p className="text-xs text-gray-400">{order.customerEmail}</p>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="font-bold text-primary text-sm">{formatMoney(order.total)}</p>
                            <p className="text-xs text-gray-400">{(order.items as OrderItem[])?.length} item{(order.items as OrderItem[])?.length !== 1 ? "s" : ""}</p>
                        </div>
                    </div>

                    {/* ── Status ── */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Order Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {STATUS_OPTIONS.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setValue("status", s, { shouldValidate: true })}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer capitalize ${currentStatus === s
                                        ? "bg-primary text-white border-primary shadow-sm"
                                        : "border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        {errors.status && (
                            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
                        )}
                    </div>

                    {/* ── Tracking Steps ── */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Tracking Details
                            </label>
                            <button
                                type="button"
                                onClick={addStep}
                                className="flex items-center gap-1.5 text-xs text-primary border border-primary/30 px-2.5 py-1 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                            >
                                <Plus size={12} /> Add Step
                            </button>
                        </div>

                        {errors.tracking?.root && (
                            <p className="text-red-500 text-xs mb-2">{errors.tracking.root.message}</p>
                        )}

                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-3">
                                    {/* Timeline dot — click to toggle completed */}
                                    <div className="flex flex-col items-center pt-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => toggleCompleted(index)}
                                            title="Toggle completed"
                                            className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${trackingValues[index]?.completed
                                                ? "bg-primary border-primary"
                                                : trackingValues[index]?.current
                                                    ? "border-primary bg-primary/10"
                                                    : "border-gray-300 dark:border-slate-600"
                                                }`}
                                        >
                                            {trackingValues[index]?.completed && (
                                                <CheckCircle size={10} className="text-white" strokeWidth={3} />
                                            )}
                                        </button>
                                        {index < fields.length - 1 && (
                                            <div className="w-0.5 flex-1 min-h-4 mt-1 bg-gray-200 dark:bg-slate-600" />
                                        )}
                                    </div>

                                    {/* Fields */}
                                    <div className="flex-1 space-y-1.5 pb-2">
                                        {/* Title row */}
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <input
                                                    {...register(`tracking.${index}.title`)}
                                                    type="text"
                                                    placeholder="Step title…"
                                                    className="w-full text-xs border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                                />
                                                {errors.tracking?.[index]?.title && (
                                                    <p className="text-red-500 text-xs mt-0.5">
                                                        {errors.tracking[index].title?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer shrink-0"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <input
                                                {...register(`tracking.${index}.description`)}
                                                type="text"
                                                placeholder="Description…"
                                                className="w-full text-xs border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            />
                                            {errors.tracking?.[index]?.description && (
                                                <p className="text-red-500 text-xs mt-0.5">
                                                    {errors.tracking[index].description?.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Date */}
                                        <div>
                                            <input
                                                {...register(`tracking.${index}.date`)}
                                                type="text"
                                                placeholder="Date / time…"
                                                className="w-full text-xs border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                            />
                                            {errors.tracking?.[index]?.date && (
                                                <p className="text-red-500 text-xs mt-0.5">
                                                    {errors.tracking[index].date?.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Current step checkbox */}
                                        <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
                                            <input
                                                {...register(`tracking.${index}.current`)}
                                                type="checkbox"
                                                className="accent-primary"
                                            />
                                            Mark as current step
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Footer (inside form so submit works) ── */}
                    <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-slate-700">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-primary text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 cursor-pointer"
                        >
                            {isSubmitting ? "Saving…" : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 text-sm text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
