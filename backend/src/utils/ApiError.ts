class ApiError {
    public success: Boolean
    public data: null

    constructor(
        public statusCode: number,
        public message: string,

    ) {
        this.message = message
        this.statusCode = statusCode || 500
        this.success = false
        this.data = null
    }
}

export default ApiError

