import { getAccessTokenAndRefreshToken, ITokens, IUser } from "../middlewares/auth.middleware"
import { Instructor } from "../models/instructor.model"
import { isPasswordCorrect, Learner } from "../models/learner.model"
import ApiError from "../utils/ApiError"
import ApiResponse from "../utils/ApiResponse"
import asyncHandler from "../utils/asyncHandler"
import userLoginValidatorSchema from "../validators/userLoginValidator"

interface IAdminDetails {
    email: string,
    password: string
}


const loginAdmin = asyncHandler(async (req, res, next) => {

    const loginDetails: IAdminDetails = req.body

    const { error } = userLoginValidatorSchema.validate(loginDetails)
    if (error) return next(new ApiError(422, "Please check your input and try again."))

    const admin = await Learner.findOne({ email: loginDetails.email, isAdmin: true })
    if (!admin) return next(new ApiError(401, "The email address or password you entered does not match our records."))

    if (! await isPasswordCorrect(loginDetails.password, admin.password)) {
        return next(new ApiError(401, "The email address or password you entered does not match our records."))
    }

    const adminDetails = await Learner.findOne({ _id: admin._id }, {
        email: 1
    })

    const result = await getAccessTokenAndRefreshToken(admin as IUser, next) // Passing next for error handler
    const { accessToken, refreshToken } = result as ITokens

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, adminDetails, "Admin logged In Successfully"))

})

const getLoggedInAdmin = asyncHandler(async (req, res, next) => {
    const { user } = req
    if (!user) return next(new ApiError(401, "You need to be logged in to access this feature. Please log in to continue."))

    const admin = await Learner.findOne({ _id: user._id }, {
        email: 1
    })

    return res.json(new ApiResponse(200, admin, "User data fetched Successfully"))
})

const getAllUsers = asyncHandler(async (req, res, next) => {

    const allLearners = await Learner.aggregate([
        {
            $match: {
                isVerified: true,
                isAdmin: false
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
                isBlocked: 1
            }
        }
    ])

    const allInstructors = await Instructor.aggregate([
        {
            $match: {
                isVerified: true
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
                isBlocked: 1
            }
        }
    ])

    return res.json(new ApiResponse(200, { learners: allLearners, instructors: allInstructors }))
})

const blockOrUnblockLearner = asyncHandler(async (req, res, next) => {
    const { id } = req.body
    if (!id) return

    const learner = await Learner.findOne({ _id: id }, { name: 1, email: 1, isBlocked: 1 })
    if (!learner) return

    learner.isBlocked = !learner.isBlocked
    await learner.save()

    return res.json(new ApiResponse(200, { learner }))

})

const blockOrUnblockInstructor = asyncHandler(async (req, res, next) => {
    const { id } = req.body
    if (!id) return

    const instructor = await Instructor.findOne({ _id: id }, { name: 1, email: 1, isBlocked: 1 })
    if (!instructor) return

    instructor.isBlocked = !instructor.isBlocked
    await instructor.save()

    return res.json(new ApiResponse(200, { instructor }))

})

export {
    loginAdmin,
    getLoggedInAdmin,
    getAllUsers,
    blockOrUnblockLearner,
    blockOrUnblockInstructor
}