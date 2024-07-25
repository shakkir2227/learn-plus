import { ApiError } from "./ApiError";

export const getRequestOptions = (method: string, body?: unknown): RequestInit => {
    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return requestOptions
}

export const makeRequest = async (BASE_URL: string, URL: string, requestOptions?: RequestInit) => {
    try {
        const response =
            await fetch(BASE_URL + URL, { ...requestOptions, credentials: "include" })
        const result = await response.json()
        return result
    }
    catch (error) {
        // TODO: Incase of netwrok error
        console.log(`Network Error: ${error}`)
        return Promise.resolve(new ApiError())
    }

}
