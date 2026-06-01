import type { NextFunction, Request, Response } from "express";
import successResponse from "../../common/utils/response.success";
import { randomUUID } from "node:crypto";
import { generateToken } from "../../common/services/token.service";
import env from "../../config/config.service";
import * as dbService from "../../DB/db.service"
import userModel, { IUser } from "../../DB/models/user.model";
import { AppError } from "../../common/utils/globalErrorHandler";
import { Compare, Hash } from "../../common/utils/security/hash.security";

export const refreshToken = async (req: Request, res: Response, _next: NextFunction) => {
    const accessToken = generateToken({
        payload: { id: req.user?._id! },
        secret_key: env.TOKEN_KEY,
        options: {
            expiresIn: "3m",
            jwtid: randomUUID()
        }
    })

    successResponse({ res, token: accessToken })
}

export const getMyProfile = async (req: Request, res: Response, _next: NextFunction) => {
    successResponse({ res, data: req.user })
}

export const updateMyProfile = async (req: Request, res: Response, _next: NextFunction) => {
    const { firstName, lastName, email, defaultAddressId, address } = req.body

    if (email && email !== req.user!.email) {
        const user = await dbService.findOne({ filter: { email }, model: userModel })
        if (user) throw new Error('Email already exists')
    }

    const updateFields: Partial<IUser> = {
        firstName: firstName || req.user!.firstName,
        lastName: lastName || req.user!.lastName,
        email: email || req.user!.email
    }

    // // find and update defualt address
    // if (address) {
    //     const address = await dbService.findOneAndUpdate({
    //         filter: { _id: defaultAddressId },
    //         update: { isDefault: true },
    //         model: addressModel
    //     })
    //     if (!address) throw new AppError('Address not found')
    //     updateFields.address
    // }

    const updatedUser = await dbService.findOneAndUpdate({
        filter: { _id: req.user?._id },
        update: updateFields,
        model: userModel
    })

    successResponse({ res, data: updatedUser })
}

export const updateMyPassword = async (req: Request, res: Response, _next: NextFunction) => {
    const { currentPassword, newPassword, reNewPassword } = req.body

    if (newPassword !== reNewPassword) throw new AppError('Passwords do not match', 400)

    if (!Compare({ plainText: currentPassword, hash: req.user!.password })) throw new AppError('Invalid current password', 400)

    const updatedUser = await dbService.findOneAndUpdate({
        filter: { _id: req.user?._id },
        update: {
            password: Hash({ plainText: newPassword }),
        },
        model: userModel
    })

    successResponse({ res, data: updatedUser })
}

export const deleteMyProfile = async (req: Request, res: Response, _next: NextFunction) => {
    await dbService.findOneAndUpdate({
        filter: { _id: req.user?._id },
        update: { deletedAt: new Date() },
        model: userModel
    })

    successResponse({ res, message: 'Profile deleted successfully' })
}
