import { Router } from "express";
import { signUp, signIn, signUpWithGmail, reSendOtp, verifyEmail, forgetPassword, resetPassword } from './auth.service'
import validation from "../../common/middleware/validation";
import { forgetPasswordSchema, resetPasswordSchema, signInSchema, signUpSchema, verifyEmailSchema } from "./auth.validation";

const authRouter = Router({ caseSensitive: true, strict: true })

authRouter.post('/signup', validation(signUpSchema), signUp)
authRouter.post('/signin', validation(signInSchema), signIn)
authRouter.post('/signUpWithGmail', signUpWithGmail)
authRouter.post('/reSendOtp', validation(forgetPasswordSchema), reSendOtp)
authRouter.patch('/verifyEmail', validation(verifyEmailSchema), verifyEmail)
authRouter.patch('/forget-password', validation(forgetPasswordSchema), forgetPassword)
authRouter.patch('/reset-password', validation(resetPasswordSchema), resetPassword)

export default authRouter
