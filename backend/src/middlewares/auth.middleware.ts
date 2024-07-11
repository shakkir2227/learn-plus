import jwt from "jsonwebtoken"
import { ILearner } from "../models/learner.model"
import { NextFunction } from "express"
import ApiError from "../utils/ApiError"

export interface ITokens  {
    accessToken: string
    refreshToken: string
}

const getAccessToken = (id: string, role: string): string => {
    return jwt.sign(
        { _id: id, role },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

const getRefreshToken = (id: string, role: string): string => {
    return jwt.sign(
        { _id: id, role },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

export const getAccessTokenAndRefreshToken = async (user: ILearner, next: NextFunction):
    Promise<ITokens | void> => {
    try {
        const accessToken = getAccessToken(user._id as string, user.role)
        const refreshToken = getRefreshToken(user._id as string, user.role)

        // Update the user DB with new refresh token
        user.refreshToken = refreshToken
        await user.save()
        return { accessToken, refreshToken }
    } catch (error) {
        return next(new ApiError(500, "Something went wrong while generating token."))
    }
}



