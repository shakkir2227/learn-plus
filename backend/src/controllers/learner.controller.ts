import asyncHandler from "../utils/asyncHandler";
import userRegisterValidatorSchema from "../validators/userRegisterValidator"
import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";

interface IuserDetails {
    name: string,
    email: string,
    password: string
}



const registerLearner = asyncHandler(async (req, res, next) => {

    const userDetails: IuserDetails = req.body;
    const { error } = userRegisterValidatorSchema.validate({ userDetails })

    if (error) throw new ApiError(400, "Please make sure you've entered valid information in all fields.")

    const existingUser = await User.findOne({ email: userDetails.email })
    if (existingUser && existingUser.isVerified) throw new ApiError(400, "You're already registered. Please log in with your credentials.")

    let user = existingUser
    if (!user) {
        const { name, email, password } = userDetails
        user = await User.create({
            name,
            email,
            password
        })
    }

    if (!user) throw new ApiError(500, "Something went wrong while registering the user")

    



})

//res.json(new ApiResponse(200, "User created"))
export {
    registerLearner
}