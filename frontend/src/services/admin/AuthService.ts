import ApiResponse from "../ApiResponse"
import { ApiError, IApiError } from "../ApiError.ts"
import { IsignupFormData } from '../../hooks/useSignupForm.ts'
import { ILoginFormData } from "../../hooks/useLoginForm.ts"
import { IAdmin } from "../../store/AdminSlice.ts"
import { ADMIN_BASE_URL } from "../../constants.ts"

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
            await fetch(ADMIN_BASE_URL + URL, { ...requestOptions, credentials: "include" })
        const result = await response.json()
        return result
    }
    catch (error) {
        // TODO: Incase of netwrok error
        console.log(`Network Error: ${error}`)
        return Promise.resolve(new ApiError())
    }

}


const loginService = async (loginFormData: ILoginFormData):
    Promise<ApiResponse<IAdmin> | IApiError> => {
    const { email, password } = loginFormData
    const requestOptions = getRequestOptions("POST", { email, password })
    return await makeRequest("/login", requestOptions)
}

const getLoggedInUserService = async () => {
    const requestOptions = getRequestOptions("GET")
    return await makeRequest("/get-loggedIn-admin", requestOptions)
}


export {
    loginService,
    getLoggedInUserService
}



