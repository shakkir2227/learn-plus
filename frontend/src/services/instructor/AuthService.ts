import ApiResponse from "../ApiResponse"
import { ApiError, IApiError } from "../ApiError.ts"
import { IsignupFormData } from '../../hooks/useSignupForm.ts'
import { ILoginFormData } from "../../hooks/useLoginForm.ts"
import { IInstructor } from "../../store/InstructorSlice.ts"
import { INSTRUCTOR_BASE_URL } from "../../constants.ts"

const getRequestOptions = (method: string, body?: unknown): RequestInit => {
    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return requestOptions
}

const makeRequest = async (URL: string, requestOptions?: RequestInit) => {
    try {
        const response =
            await fetch(INSTRUCTOR_BASE_URL + URL, { ...requestOptions, credentials: "include" })
        const result = await response.json()
        return result
    }
    catch (error) {
        // TODO: Incase of netwrok error
        console.log(`Network Error: ${error}`)
        return Promise.resolve(new ApiError())
    }

}

// TODO: minifiy this.
const signUpService = async (instructorDetails: IsignupFormData):
    Promise<ApiResponse<string> | IApiError> => {

    const requestOptions = getRequestOptions("POST", instructorDetails)

    try {
        const response = await fetch(INSTRUCTOR_BASE_URL + "/register", requestOptions)
        const result = await response.json()
        return result
    }
    catch (error) {
        // TODO: Incase of netwrok error
        console.log(`Network Error: ${error}`)
        return Promise.resolve(new ApiError())
    }
}

const verifyEmailService = async (OTP: string, learnerId: string):
    Promise<ApiResponse<string> | IApiError> => {

    const requestOptions = getRequestOptions("POST", { OTP, learnerId })
    return await makeRequest("/verify-email", requestOptions)
}

const loginService = async (loginFormData: ILoginFormData):
    Promise<ApiResponse<IInstructor> | IApiError> => {
    const { email, password } = loginFormData
    const requestOptions = getRequestOptions("POST", { email, password })
    return await makeRequest("/login", requestOptions)
}

const getLoggedInUserService = async () => {
    const requestOptions = getRequestOptions("GET")
    return await makeRequest("/get-loggedIn-instructor", requestOptions)
}


export {
    signUpService,
    verifyEmailService,
    loginService,
    getLoggedInUserService
}


