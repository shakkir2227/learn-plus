import { Request, Response, NextFunction } from "express"

type ControllerFn = (req: Request, res: Response, next: NextFunction) => Promise<ApiResponse<unknown> | ApiError>

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