class ApiResponse<T> {
    constructor(
        public statusCode: number,
        public data?: T,
        public message?: string,
        public success?: Boolean,
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message || "Success"
        this.success = true
    }
}

