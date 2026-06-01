import { Router } from "express";
import { getMyProfile, refreshToken, updateMyProfile, updateMyPassword, deleteMyProfile } from './user.service'
import createAuth from "../../common/middleware/authentication";
import authorization from "../../common/middleware/authorization";
import { RoleEnum } from "../../common/enum/user.enum";
import env from "../../config/config.service";

const authenticationRefreshToken = createAuth(env.REFRESH_TOKEN_KEY)
const authenticationUser = createAuth(env.TOKEN_KEY)

const userRouter = Router({ caseSensitive: true, strict: true })

userRouter.get('/profile', authenticationUser, authorization([RoleEnum.user]), getMyProfile)
userRouter.patch('/profile', authenticationUser, authorization([RoleEnum.user]), updateMyProfile)
userRouter.patch('/profile/password', authenticationUser, authorization([RoleEnum.user]), updateMyPassword)
userRouter.delete('/profile', authenticationUser, authorization([RoleEnum.user]), deleteMyProfile)
userRouter.post('/refreshToken', authenticationRefreshToken, authorization([RoleEnum.user]), refreshToken)

export default userRouter
