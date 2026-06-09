import { z } from "zod";
import { contactUsSchema, forgetPasswordSchema, resetPasswordSchema, signInSchema, signUpSchema, verifyOtpSchema } from "./auth.validation";

export type signUpType = z.infer<typeof signUpSchema>
export type signInType = z.infer<typeof signInSchema>
export type verifyOtpType = z.infer<typeof verifyOtpSchema>
export type forgetPasswordType = z.infer<typeof forgetPasswordSchema>
export type resetPasswordType = z.infer<typeof resetPasswordSchema>
export type ContactUsType = z.infer<typeof contactUsSchema>