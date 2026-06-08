import * as z from 'zod'

// signIn schema
export const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'password must be at least 6 characters long')
}).strict()


// body signUp schema
export const signUpSchemaBody = z.object({
    email: z.email(),
    password: z.string().min(6, 'password must be at least 6 characters long'),
    cPassword: z.string().min(6, 'confirmPassword must be at least 6 characters long'),
    userName: z.string().min(3, 'userName must be at least 3 characters long').max(25, 'userName must be at most 25 characters long')
}).strict()

// refined signUp schema -> split for password and cPassword to get error with the rest of the fields
const signUpSchemaRefined = signUpSchemaBody.refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
    when(payload) {
        return signUpSchemaBody.pick({ password: true, cPassword: true }).safeParse(payload.value).success
    },
})

// signUp schema
export const signUpSchema = signUpSchemaRefined;

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