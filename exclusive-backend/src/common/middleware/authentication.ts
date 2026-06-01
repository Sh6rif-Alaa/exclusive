import { verifyToken } from "../services/token.service"
import { NextFunction, Request, Response } from "express"
import env from "../../config/config.service"
import { AppError } from "../utils/globalErrorHandler"
import * as redisService from "../services/redis.service"
import { findById } from "../../DB/db.service"
import userModel from "../../DB/models/user.model"

const createAuth = (secret_key: string) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const { authorization } = req.headers

        if (!authorization) throw new AppError('no authentication (token)', 404)

        const [prefix, token] = authorization.split(' ')

        if (prefix !== env.PREFIX) throw new AppError('invalid prefix', 404)

        const decode = verifyToken({ token: token!, secret_key })

        if (!decode || !decode?.id) throw new AppError('invalid token', 400)

        const user = await findById({ model: userModel, id: decode.id })

        if (!user) throw new AppError('user not exist', 404)

        if (user.changeCredential?.getTime()! > decode.iat! * 1000) throw new AppError('invalid all token', 400)

        const revokeToken = await redisService.getValue(redisService.revokeKey({ userId: user._id, jti: decode.jti as unknown as string }))

        if (revokeToken) throw new AppError('invalid token revokeToken', 400)

        req.user = user
        req.decode = decode

        next()
    }
}

export default createAuth
