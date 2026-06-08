import { z } from "zod";
import { forgetPasswordSchema, reSendOtpSchema, resetPasswordSchema, signInSchema, signUpSchemaBody, verifyEmailSchema } from "./auth.validation";

export type signUpType = z.infer<typeof signUpSchemaBody>

export type signInType = z.infer<typeof signInSchema.body>

export type verifyEmailType = z.infer<typeof verifyEmailSchema.body>

export type forgetPasswordType = z.infer<typeof forgetPasswordSchema.body>

export type reSendOtpType = z.infer<typeof reSendOtpSchema.body>

export type resetPasswordType = z.infer<typeof resetPasswordSchema.body>