import * as z from 'zod'

// signIn schema
export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'password must be at least 6 characters long')
}).strict()


// body signUp schema
export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'password must be at least 6 characters long'),
    cPassword: z.string().min(6, 'confirmPassword must be at least 6 characters long'),
    userName: z.string().min(4, 'userName must be at least 4 characters long').max(25, 'userName must be at most 25 characters long')
}).refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
}).refine((data) => {
    const parts = (data.userName as string).split(' ')
    if (parts.length <= 2) return false
    return true
}, {
    message: "userName must contain at least first name and last name (example: Sherif Alaa)",
    path: ["userName"],
}).strict()

// verifyOtp Schema
export const verifyOtpSchema = z.object({
    otp: z.string().length(6, 'otp must be 6 digits long'),
}).strict()


// forgetPassword Schema
export const forgetPasswordSchema = z.object({
    email: z.email(),
}).strict()


// resetPassword Schema
export const resetPasswordSchema = z.object({
    password: z.string().min(6, 'password must be at least 6 characters long'),
    cPassword: z.string().min(6, 'confirmPassword must be at least 6 characters long'),
}).strict()

// contactUs schema
export const contactUsSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email address"),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});