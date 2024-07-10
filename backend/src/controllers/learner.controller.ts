import asyncHandler from "../utils/asyncHandler";
import userRegisterValidatorSchema from "../validators/userRegisterValidator"
import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";
import { sendMail, emailVerificationContent } from "../utils/sendMail";

interface IuserDetails {
    name: string,
    email: string,
    password: string
}

const registerLearner = asyncHandler(async (req, res, next) => {

    const userDetails: IuserDetails = req.body;
    const { error } = userRegisterValidatorSchema.validate(userDetails)

    if (error) return next(new ApiError(400, error.message))

    const existingUser = await User.findOne({ email: userDetails.email })
    if (existingUser && existingUser.isVerified) return next(new ApiError(400, "You're already registered. Please log in with your credentials."))

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

    let OTPNumber = Math.floor(100000 + Math.random() * 900000);

    await sendMail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationContent(user.name, OTPNumber),
    });



})

//res.json(new ApiResponse(200, "User created"))
export {
    registerLearner
}