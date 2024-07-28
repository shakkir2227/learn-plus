import ApiResponse from "../ApiResponse"
import { ApiError, IApiError } from "../ApiError.ts"
import { IsignupFormData } from '../../hooks/useSignupForm.ts'
import { ILoginFormData } from "../../hooks/useLoginForm.ts"
import { IAdmin } from "../../store/AdminSlice.ts"
import { ADMIN_BASE_URL, COURSES_BASE_URL, INSTRUCTOR_BASE_URL, LEARNER_BASE_URL } from "../../constants.ts"
import { getRequestOptions, makeRequest } from "../index.ts"
import { IUser } from "../../store/AdminSlice.ts"


export const createCourseService = async (formData: FormData) => {
    try {
        const response = await fetch(`${COURSES_BASE_URL}/create-course`, {
            method: 'POST',
            body: formData,
            credentials: "include"
        });

        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
    }
}



