import ApiResponse from "../ApiResponse"
import { ApiError, IApiError } from "../ApiError.ts"
import { IsignupFormData } from '../../hooks/useSignupFormData.ts'

const LEARNER_BASE_URL = "http://localhost:3000/api/v1/learners"

const getRequestOptions = (method: string, body: unknown): RequestInit => {
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
        const response = await fetch(LEARNER_BASE_URL + URL, requestOptions)
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



export {
    signUpService,
    verifyEmailService
}



