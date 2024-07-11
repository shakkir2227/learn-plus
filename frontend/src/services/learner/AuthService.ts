import ApiResponse from "../ApiResponse"
import { ApiError, IApiError } from "../ApiError.ts"

const LEARNER_BASE_URL = "http://localhost:3000/api/v1/learners"
import { IsignupFormData } from '../../hooks/useSignupFormData.ts'

const signUpService = async (learnerDetails: IsignupFormData):
    Promise<ApiResponse<string> | IApiError> => {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(learnerDetails)
    };

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

export {
    signUpService
}



