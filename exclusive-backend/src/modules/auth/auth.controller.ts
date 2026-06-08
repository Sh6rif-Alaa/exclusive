import { Router } from "express";
import { signUp, signIn, signUpWithGmail, reSendOtp, verifyEmail, forgetPassword, resetPassword, logout } from './auth.service'
import validation from "../../common/middleware/validation";
import { forgetPasswordSchema, reSendOtpSchema, resetPasswordSchema, signInSchema, signUpSchema, verifyEmailSchema } from "./auth.validation";
import authorization from "../../common/middleware/authorization";
import createAuth from "../../common/middleware/authentication";
import env from "../../config/config.service";
import { RoleEnum } from "../../common/enum/user.enum";

const authenticationUser = createAuth(env.TOKEN_KEY)

const authRouter = Router({ caseSensitive: true, strict: true })

authRouter.post('/signup', validation(signUpSchema), signUp)
authRouter.post('/signin', validation(signInSchema), signIn)
authRouter.post('/signUpWithGmail', signUpWithGmail)
authRouter.post('/reSendOtp', validation(reSendOtpSchema), reSendOtp)
authRouter.post('/verifyEmail', validation(verifyEmailSchema), verifyEmail)
authRouter.post('/forget-password', validation(forgetPasswordSchema), forgetPassword)
authRouter.patch('/reset-password', validation(resetPasswordSchema), resetPassword)

authRouter.post('/logout', authenticationUser, authorization([RoleEnum.user]), logout)

export default authRouter
