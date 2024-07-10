class ApiError extends Error {
    public success: Boolean
    public data: null 

    constructor(
        public statusCode: number,
        public message: string = "Something went wrong!!",

    ) {
        super(message)
        this.statusCode = statusCode || 500
        this.message = message
        this.success = false
        this.data = null
    }
}

export default ApiError

