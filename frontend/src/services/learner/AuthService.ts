import ApiResponse from "../ApiResponse"
import { ApiError, IApiError } from "../ApiError.ts"
import { IsignupFormData } from '../../hooks/useSignupForm.ts'
import { ILoginFormData } from "../../hooks/useLoginForm.ts"
import { ILearner } from "../../store/LearnerSlice.ts"
import { LEARNER_BASE_URL } from "../../constants.ts"


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
            await fetch(LEARNER_BASE_URL + URL, { ...requestOptions, credentials: "include" })
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
const signUpService = async (learnerDetails: IsignupFormData):
    Promise<ApiResponse<string> | IApiError> => {

    const requestOptions = getRequestOptions("POST", learnerDetails)

    try {
        const response = await fetch(LEARNER_BASE_URL + "/register", requestOptions)
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
    Promise<ApiResponse<ILearner> | IApiError> => {
    const { email, password } = loginFormData
    const requestOptions = getRequestOptions("POST", { email, password })
    return await makeRequest("/login", requestOptions)
}

const logoutService = async ():
    Promise<ApiResponse<string> | IApiError> => {
    const requestOptions = getRequestOptions("POST")
    return await makeRequest("/logout", requestOptions)
}


const getLoggedInUserService = async () => {
    const requestOptions = getRequestOptions("GET")
    return await makeRequest("/get-loggedIn-learner", requestOptions)
}

const resendOTPService = async (learnerId: string) => {
    const requestOptions = getRequestOptions("POST", { learnerId })
    return await makeRequest("/resend-otp", requestOptions)

}

export {
    signUpService,
    verifyEmailService,
    loginService,
    getLoggedInUserService,
    resendOTPService,
    logoutService
}



