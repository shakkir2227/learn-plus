import asyncHandler from "../utils/asyncHandler";
import userRegisterValidatorSchema from "../validators/userRegisterValidator"
import { ILearner, Learner } from "../models/learner.model";
import { isOTPCorrect, OTP } from "../models/otp.model";
import ApiError from "../utils/ApiError";
import { sendMail, emailVerificationContent } from "../utils/sendMail";
import ApiResponse from "../utils/ApiResponse";
import { getAccessTokenAndRefreshToken, ITokens } from "../middlewares/auth.middleware";

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

    return res.json(new ApiResponse(201, learner._id, `Verification Email has been sent`))

})

const verifyLearnerEmail = asyncHandler(async (req, res, next) => {

    const { OTP: inputOTP, learnerId } = req.body
    if (!inputOTP) return next(new ApiError(400, "Please enter the OTP to proceed with verification"))

    const otp = await OTP.findOne({ userId: learnerId })
    if (!otp) return next(new ApiError(400, "The OTP has expired. Please click 'Resend OTP' to receive a new one."))

    if (! await isOTPCorrect(inputOTP, otp.OTP)) return next(new ApiError(400, "The OTP entered is invalid. Please check and try again."))

    await Learner.updateOne({ _id: learnerId }, { isVerified: true })
    const learner = await Learner.findOne({_id: learnerId}, {
        name: 1, email: 1, coursesEnrolled: 1,
    }) as ILearner

    const result = await getAccessTokenAndRefreshToken(learner, next) // Passing next for error handler
    const { accessToken, refreshToken } = result as ITokens

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, learner, "Learner logged In Successfully"))
})

export {
    registerLearner,
    verifyLearnerEmail
}