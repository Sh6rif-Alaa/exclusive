import * as z from "zod";

//  Update Profile 
export const updateProfileSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    address: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    reNewPassword: z.string().optional(),
}).superRefine((data, ctx) => {
    const changing = data.newPassword || data.reNewPassword;
    if (!changing) return;

    if (!data.currentPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Current password is required to set a new one",
            path: ["currentPassword"],
        });
    }
    if (data.newPassword && data.newPassword.length < 6) {
        ctx.addIssue({
            code: "custom",
            message: "New password must be at least 6 characters",
            path: ["newPassword"],
        });
    }
    if (data.newPassword !== data.reNewPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["reNewPassword"],
        });
    }
}).strict();;

//  Checkout / Billing
export const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    company: z.string().optional(),
    street: z.string().min(5, "Street address is required"),
    apartment: z.string().optional(),
    city: z.string().min(2, "City is required"),
    phone: z.string().min(10, "Enter a valid phone number"),
    email: z.email("Invalid email address"),
    saveInfo: z.boolean().optional(),
}).strict();

//  Address
export const addressSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    phone: z.string().min(10, "Enter a valid phone number"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    type: z.enum(["home", "work", "other"]),
}).strict();

//  Review 
export const reviewSchema = z.object({
    rating: z.number("Please select a rating").min(1, "Please select a rating").max(5),
    comment: z.string().min(10, "Review must be at least 10 characters"),
}).strict();;

//  Payment Method 
export const paymentMethodSchema = z.object({
    cardHolder: z.string().min(3, "Card holder name is required"),
    cardNumber: z.string().regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
    cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3–4 digits"),
}).strict();;
