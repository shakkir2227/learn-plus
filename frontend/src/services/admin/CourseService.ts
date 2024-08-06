import ApiResponse from "../ApiResponse"
import { IApiError } from "../ApiError.ts"
import { ADMIN_BASE_URL, COURSES_BASE_URL } from "../../constants.ts"
import { getRequestOptions, makeRequest } from "../index.ts"

 type Subject = {
    _id: string,
    name: string,
    isBlocked: boolean
}

type Course = {
    name: string,
    instructor: string,
    isBlocked: boolean
}


export const createSubjectService = async (subject: string): Promise<ApiResponse<Subject> | IApiError> => {
    const requestOptions = getRequestOptions("POST", { subject })
    return await makeRequest(COURSES_BASE_URL, "/create-subject", requestOptions)
}

export const getAllCoursesAndSubjectsService = async (): Promise<ApiResponse<{ allCourses: Course[], allSubjects: Subject[] }> | IApiError> => {
    const requestOptions = getRequestOptions("GET")
    return await makeRequest(COURSES_BASE_URL, "/get-all-courses-subjects-admin", requestOptions)
}

export const courseBlockUnblockService = async (courseId: string): Promise<ApiResponse<{ course?: Course }> | IApiError> => {
    const requestOptions = getRequestOptions("PATCH", { courseId })
    return await makeRequest(COURSES_BASE_URL, "/block-or-unblock-course", requestOptions)

}
