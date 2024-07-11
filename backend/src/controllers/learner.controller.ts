import asyncHandler from "../utils/asyncHandler";
import userRegisterValidatorSchema from "../validators/userRegisterValidator"
import { Learner } from "../models/learner.model";
import { OTP } from "../models/otp.model";
import ApiError from "../utils/ApiError";
import { sendMail, emailVerificationContent } from "../utils/sendMail";
import ApiResponse from "../utils/ApiResponse";

interface IlearnerDetails {
    name: string,
    email: string,
    password: string
}

const registerLearner = asyncHandler(async (req, res, next) => {

    const learnerDetails: IlearnerDetails = req.body;
    const { error } = userRegisterValidatorSchema.validate(learnerDetails)

    if (error) return next(new ApiError(400, error.message))

    const existingLearner = await Learner.findOne({ email: learnerDetails.email })
    if (existingLearner && existingLearner.isVerified) return next(new ApiError(400, "You're already registered. Please log in with your credentials."))

    let learner = existingLearner
    if (!learner) {
        const { name, email, password } = learnerDetails
        learner = await Learner.create({
            name,
            email,
            password
        })
    }

    if (!learner) return next(new ApiError(500, "Something went wrong while registering the user"))

    let OTPNumber = Math.floor(100000 + Math.random() * 900000);

    await OTP.create({
        userId: learner?._id,
        OTP: OTPNumber,
    })

    setTimeout(async () => {
        await OTP.deleteOne({ userId: learner?._id })
    }, 60000);

    await sendMail({
        email: learner.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationContent(learner.name, OTPNumber),
    });

    return res.json(new ApiResponse(201, learner._id, `Verification Email has been sent` ))

})

export {
    registerLearner
}