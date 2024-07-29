import ApiResponse from "../ApiResponse"
import { ApiError, IApiError } from "../ApiError.ts"
import { IsignupFormData } from '../../hooks/useSignupForm.ts'
import { ILoginFormData } from "../../hooks/useLoginForm.ts"
import { IAdmin } from "../../store/AdminSlice.ts"
import { ADMIN_BASE_URL, COURSES_BASE_URL, INSTRUCTOR_BASE_URL, LEARNER_BASE_URL } from "../../constants.ts"
import { getRequestOptions, makeRequest } from "../index.ts"
import { IUser } from "../../store/AdminSlice.ts"
import { Course, Language } from "../learner/CourseService.ts"


export const createCourseService = async (formData: FormData): Promise<ApiResponse<string> | IApiError> => {
    try {
        const response = await fetch(`${COURSES_BASE_URL}/create-course`, {
            method: 'POST',
            body: formData,
            credentials: "include"
        });

        const result = await response.json()
        return result

    } catch (error) {
        return Promise.resolve(new ApiError())
    }
}

export type Subject = {
    _id: string,
    name: string
}

export const getAllSubjectsService = async (): Promise<ApiResponse<{ allSubjects: Subject[] }> | IApiError> => {
    const requestOptions = getRequestOptions("GET")
    return await makeRequest(COURSES_BASE_URL, "/get-all-subjects", requestOptions)
}

export const getAllCoursesService = async (): Promise<ApiResponse<
    { allCourses: Course[] }> | IApiError> => {

    const requestOptions = getRequestOptions("GET")
    return await makeRequest(COURSES_BASE_URL, "/get-instructor-courses", requestOptions)
}






