export interface IApiError {
    statusCode?: number,
    message?: string,
    success?: Boolean,
    data?: null
}

export class ApiError implements IApiError {
    constructor(
        public statusCode?: number,
        public message?: string,
        public success?: Boolean,
        public data?: null
    ) {
        this.statusCode = 500
        this.message = "Oops!! Failed to communicate with the server. Please try again later"
        this.success = false
        this.data = null
    }
}