import asyncHandler from "../utils/asyncHandler";
import userRegisterValidatorSchema from "../validators/userRegisterValidator"
import userLoginValidatorSchema from "../validators/userLoginValidator"
import { ILearner, isPasswordCorrect, Learner } from "../models/learner.model";
import { isOTPCorrect, OTP } from "../models/otp.model";
import ApiError from "../utils/ApiError";
import { sendMail, emailVerificationContent } from "../utils/sendMail";
import ApiResponse from "../utils/ApiResponse";
import { getAccessTokenAndRefreshToken, ICustomRequest, ITokens, IUser } from "../middlewares/auth.middleware";

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
    console.log(`OTP sent to user: ${OTPNumber}`)

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
    const learner = await Learner.findOne({ _id: learnerId }, {
        name: 1, email: 1, coursesEnrolled: 1,
    }) as ILearner

    const result = await getAccessTokenAndRefreshToken(learner as IUser, next) // Passing next for error handler
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

const loginLearner = asyncHandler(async (req, res, next) => {

    const loginDetails: IlearnerDetails = req.body

    const { error } = userLoginValidatorSchema.validate(loginDetails)
    if (error) return next(new ApiError(422, "Please check your input and try again."))

    const learner = await Learner.findOne({ email: loginDetails.email, isVerified: true, isAdmin: false })
    if (!learner) return next(new ApiError(401, "The email address or password you entered does not match our records."))

    if (learner.isBlocked) return next(new ApiError(403, "Your account has been blocked. Please contact support for more information"))

    if (! await isPasswordCorrect(loginDetails.password, learner.password)) {
        return next(new ApiError(401, "The email address or password you entered does not match our records."))
    }

    const learnerDetails = await Learner.findOne({ _id: learner._id }, {
        name: 1, email: 1, coursesEnrolled: 1,
    }) as ILearner

    const result = await getAccessTokenAndRefreshToken(learner as IUser, next) // Passing next for error handler
    const { accessToken, refreshToken } = result as ITokens

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, learnerDetails, "Learner logged In Successfully"))

})

const resendOTP = asyncHandler(async (req, res, next) => {
    const { learnerId } = req.body
    if (!learnerId) return next(new ApiError(500, "Something went wrong while registering the user"))

    const learner = await Learner.findById(learnerId)
    if (!learner) return next(new ApiError(500, "Something went wrong while registering the user"))

    await OTP.deleteOne({ userId: learner._id }) // Deleting the OTP if already exists

    let OTPNumber = Math.floor(100000 + Math.random() * 900000);
    console.log(`OTP sent to user: ${OTPNumber}`)

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

    return res.json(new ApiResponse(200, learner._id, `Verification Email has been sent`))
})

const getLoggedInLearner = asyncHandler(async (req, res, next) => {
    const { user } = req as ICustomRequest

    const learner = await Learner.findOne({ _id: user._id }, {
        name: 1, email: 1, coursesEnrolled: 1,
    }) as ILearner

    return res.json(new ApiResponse(200, learner, "User data fetched Successfully"))
})

const updateProfile = asyncHandler(async (req, res, next) => {
    const { name } = req.body
    if (!/^[A-Za-z][A-Za-z\s]{1,28}$/.test(name)) return next(new ApiError(400, "Validation error: Please check your input and try again."))

    if (req.user) {
        await Learner.findOneAndUpdate({ _id: req.user._id },
            { $set: { name: name } })

        const updatedLearner = await Learner.findById({ _id: req.user._id }, {
            name: 1, email: 1, coursesEnrolled: 1,
        })
        return res.json(new ApiResponse(200, { learner: updatedLearner }, "Your profile has been updated successfully!"))
    }
})

const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) return
    if (!req.user) return

    const learner = await Learner.findById(req.user._id)
    if (!learner) return
    if (!await isPasswordCorrect(oldPassword, learner.password)) {
        return next(new ApiError(400, "The password you entered does not match our records."))
    }

    learner.password = newPassword
    await learner.save()

    return res.json(new ApiResponse(200, {}, "Password updated successfully."))
})

const logoutLearner = asyncHandler(async (req, res) => {
    if (!req.user) return

    await Learner.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: '' },
    });

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

export {
    registerLearner,
    verifyLearnerEmail,
    loginLearner,
    getLoggedInLearner,
    resendOTP,
    updateProfile,
    updatePassword,
    logoutLearner
}