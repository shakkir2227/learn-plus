import ApiResponse from "../ApiResponse"
import { IApiError } from "../ApiError.ts"
import { ADMIN_BASE_URL, COURSES_BASE_URL } from "../../constants.ts"
import { getRequestOptions, makeRequest } from "../index.ts"

type Subject = {
    _id: string,
    name: string,
    isBlocked: boolean
}

export const createSubjectService = async (subject: string): Promise<ApiResponse<Subject> | IApiError> => {
    const requestOptions = getRequestOptions("POST", { subject })
    return await makeRequest(COURSES_BASE_URL, "/create-subject", requestOptions)
}
