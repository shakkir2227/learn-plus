import { Request, Response, NextFunction } from "express"
import ApiResponse from "./ApiResponse"
import ApiError from "./ApiError"

type ControllerFn = (req: Request, res: Response, next: NextFunction) =>
    Promise<Promise<ApiResponse<unknown>> | void>


const asyncHandler = (fn: ControllerFn) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            if (error instanceof Error) {
                next(new ApiError(500, error.message))
            }
        }
    }
}

export default asyncHandler