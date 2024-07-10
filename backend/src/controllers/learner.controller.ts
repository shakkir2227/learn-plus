import asyncHandler from "../utils/asyncHandler";

const registerLearner = asyncHandler(async (req, res) => {

    return new ApiResponse(200, "User created")
})

export {
    registerLearner
}