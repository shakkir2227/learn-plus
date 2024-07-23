import jwt from "jsonwebtoken"
import { Learner } from "../models/learner.model"
import { Document } from "mongoose";
import { NextFunction, Request, Response } from "express"
import ApiError from "../utils/ApiError"
import { Instructor } from "../models/instructor.model";
import asyncHandler from "../utils/asyncHandler";

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IJWTPayload {
    _id: string,
    role: "Learner" | "Instructor" | "Admin"
}

export interface IUser extends Document {
    _id: string,
    name: string,
    email: string,
    refreshToken: string,
    role: "Learner" | "Instructor" | "Admin"
}

export interface ICustomRequest extends Request {
    user: IUser
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies
    if (!accessToken) return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as IJWTPayload
        const user = (decoded.role === "Learner" || decoded.role === "Admin")
            ? await Learner.findById(decoded._id) as IUser
            : await Instructor.findById(decoded._id) as IUser// TODO: Change this!! Create instructor model. 

        req.user = user
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            req.user = await refreshAccessToken(req, res, next) as IUser
            next()
        } else {
            return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))
        }
    }
}

const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IJWTPayload
        const user = decoded.role === ("Learner" || "Admin")
            ? await Learner.findById(decoded._id) as IUser
            : await Learner.findById(decoded._id) as IUser// TODO: Change this!! Create instructor model.

        if (!user) return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))

        // To make refresh token usable once.
        if (refreshToken !== user.refreshToken) return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await getAccessTokenAndRefreshToken(user, next) as ITokens

        const options = {
            httpOnly: true,
            secure: true
        }

        res.cookie("accessToken", newAccessToken, options)
            .cookie("refreshToken", newRefreshToken, options)

        return user

    } catch (error) {
        return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))
    }
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

export const getAccessTokenAndRefreshToken = async (user: IUser, next: NextFunction):
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


export const verifyPermission = (roles: IUser["role"][]) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))

        if (!roles.includes(req.user.role)) return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))

        next()

    })
}


