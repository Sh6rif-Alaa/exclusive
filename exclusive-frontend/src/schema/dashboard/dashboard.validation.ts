import * as z from "zod";

// Single tracking step schema
export const trackingStepSchema = z.object({
    id: z.string(),
    title: z.string().min(1, "Step title is required"),
    description: z.string().min(1, "Description is required"),
    date: z.string().min(1, "Date is required"),
    completed: z.boolean(),
    current: z.boolean(),
});

// Order update schema
export const orderUpdateSchema = z.object({
    status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"], {
        error: "Please select a valid status",
    }),
    tracking: z
        .array(trackingStepSchema)
        .min(1, "At least one tracking step is required"),
});
