import { getRequestOptions, makeRequest } from ".."
import { COURSES_BASE_URL } from "../../constants"
import { IApiError } from "../ApiError"
import ApiResponse from "../ApiResponse"

export type Subject = {
    _id: string,
    name: string
}

export interface Course {
    _id: string,
    name: string,
    instructorName: string,
    courseSubject: Subject
    courseLanguage: Language
}
export type Language = {
    _id: string,
    name: string
}

export const getAllCoursesService = async (): Promise<ApiResponse<
    { allCourses: Course[], allSubjects: Subject[], allLanguages: Language[] }> | IApiError> => {

    const requestOptions = getRequestOptions("GET")
    return await makeRequest(COURSES_BASE_URL, "/get-all-courses", requestOptions)
}

export interface DetailedCourse {
    _id: string,
    name: string,
    description: string,
    thumbnail: string,
    objectives: string[],
    isBlocked: boolean,
    courseInstructor: {
        _id: string,
        name: string,
    }
    courseSubject: {
        name: string
    }
    courseLanguage: {
        name: string
    }
}

export interface Lesson {
    _id: string,
    name: string,
    content: string,
    order_index: number
}

export const getCourseDetailsService = async (courseId: string): Promise<ApiResponse<
    { courseDetails: DetailedCourse, lessons: Lesson[] }> | IApiError> => {

    const requestOptions = getRequestOptions("GET")
    return await makeRequest(COURSES_BASE_URL, "/get-courseDetails/" + courseId, requestOptions)
}
