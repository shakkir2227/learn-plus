import { Request, Response, NextFunction } from "express"
import ApiError from "../utils/ApiError"

const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction) => {

    return res.status(err?.statusCode).json(err)
}

export default errorHandler