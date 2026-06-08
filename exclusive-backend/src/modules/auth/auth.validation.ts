import * as z from 'zod'
import { emailEnum } from '../../common/enum/email.enum'

// signIn schema
export const signInSchema = {
    body: z.object({
        email: z.email(),
        password: z.string().min(6, 'password must be at least 6 characters long')
    }).strict()
}

// body signUp schema
export const signUpSchemaBody = z.object({
    email: z.email(),
    password: z.string().min(6, 'password must be at least 6 characters long'),
    cPassword: z.string().min(6, 'confirmPassword must be at least 6 characters long'),
    userName: z.string().min(3, 'userName must be at least 3 characters long').max(25, 'userName must be at most 25 characters long')
}).strict()

// refined signUp schema -> split for password and cPassword to get error with the rest of the fields
const signInSchemaRefined = signUpSchemaBody.refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
    when(payload) {
        return signUpSchemaBody.pick({ password: true, cPassword: true }).safeParse(payload.value).success
    },
})

// signUp schema
export const signUpSchema = {
    body: signInSchemaRefined
}

// forgetPassword Schema
export const forgetPasswordSchema = {
    body: z.object({
        email: z.email(),
    }).strict()
}

// verifyEmail Schema
export const verifyEmailSchema = {
    body: z.object({
        email: z.email(),
        otp: z.string().length(6, 'otp must be 6 digits long'),
    }).strict(),

    query: z.object({
        type: z.enum(emailEnum),
    }).strict()
}

// reSendOtp Schema
export const reSendOtpSchema = {
    body: forgetPasswordSchema.body,

    query: z.object({
        type: z.enum(emailEnum),
    }).strict()
}

// resetPassword Schema
export const resetPasswordSchema = {
    body: verifyEmailSchema.body.safeExtend({
        password: z.string().min(6, 'password must be at least 6 characters long'),
        cPassword: z.string().min(6, 'confirmPassword must be at least 6 characters long'),
    }).strict(),
}