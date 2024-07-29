import ApiResponse from "../ApiResponse"
import { IApiError } from "../ApiError.ts"
import { ADMIN_BASE_URL } from "../../constants.ts"
import { getRequestOptions, makeRequest } from "../index.ts"
import { IUser } from "../../store/AdminSlice.ts"

interface IResponse {
    learners: IUser[],
    instructors: IUser[]
}

export const getAllUsers = async (): Promise<ApiResponse<IResponse> | IApiError> => {
    const requestOptions = getRequestOptions("GET")
    return await makeRequest(ADMIN_BASE_URL, "/get-all-users", requestOptions)
}

export const userUpdateService = async (role: "LEARNER" | "INSTRUCTOR", id: string): Promise<ApiResponse<{ learner?: IUser, instructor?: IUser }> | IApiError> => {
    const requestOptions = getRequestOptions("POST", { id })
    if (role === "LEARNER") {
        return await makeRequest(ADMIN_BASE_URL, "/block-or-unblock-learner", requestOptions)
    } else {
        return await makeRequest(ADMIN_BASE_URL, "/block-or-unblock-instructor", requestOptions)
    }
}


