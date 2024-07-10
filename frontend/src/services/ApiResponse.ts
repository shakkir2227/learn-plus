interface ApiResponse<T> {
    statusCode: number,
    message: string,
    success: Boolean,
    data: T
}

export default ApiResponse