class ApiError extends Error {
    public success: Boolean
    public data: null 

    constructor(
        public statusCode: number,
        public message: string = "Something went wrong!!",
        public errors: Array<string> = [],
    ) {
        super(message)
        this.statusCode = statusCode || 500
        this.message = message
        this.errors = errors
        this.success = false
        this.data = null
    }
}

