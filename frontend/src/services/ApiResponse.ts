interface ApiResponse<T> {
    statusCode: number,
    data: T
    message: string,
    success: Boolean,
}

export default ApiResponse