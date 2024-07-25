import ApiResponse from "../ApiResponse"
import { ApiError, IApiError } from "../ApiError.ts"
import { IsignupFormData } from '../../hooks/useSignupForm.ts'
import { ILoginFormData } from "../../hooks/useLoginForm.ts"
import { IAdmin } from "../../store/AdminSlice.ts"
import { ADMIN_BASE_URL, LEARNER_BASE_URL } from "../../constants.ts"
import { getRequestOptions, makeRequest } from "../index.ts"
import { IUser } from "../../store/AdminSlice.ts"


export const updateProfileService = async (name: string): Promise<ApiResponse<IUser> | IApiError> => {
    const requestOptions = getRequestOptions("PATCH", { name })
    return await makeRequest(LEARNER_BASE_URL, "/update-profile", requestOptions)
}

export const updatePasswordService = async (oldPassword: string, newPassword: string): Promise<ApiResponse<string> | IApiError> => {
    const requestOptions = getRequestOptions("PATCH", { oldPassword, newPassword })
    return await makeRequest(LEARNER_BASE_URL, "/update-password", requestOptions)
}


