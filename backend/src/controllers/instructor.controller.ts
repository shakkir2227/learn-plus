import asyncHandler from "../utils/asyncHandler";
import userRegisterValidatorSchema from "../validators/userRegisterValidator"
import userLoginValidatorSchema from "../validators/userLoginValidator"
import { isPasswordCorrect } from "../models/instructor.model";
import { isOTPCorrect, OTP } from "../models/otp.model";
import ApiError from "../utils/ApiError";
import { sendMail, emailVerificationContent } from "../utils/sendMail";
import ApiResponse from "../utils/ApiResponse";
import { getAccessTokenAndRefreshToken, ICustomRequest, ITokens, IUser } from "../middlewares/auth.middleware";
import { IInstructor, Instructor } from "../models/instructor.model";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { USER_DEFAULT_IMG } from "../constants";

interface IInstructorDetails {
    name: string,
    email: string,
    password: string
}

const registerInstructor = asyncHandler(async (req, res, next) => {

    const instructorDetails: IInstructorDetails = req.body;
    const { error } = userRegisterValidatorSchema.validate(instructorDetails)

    if (error) return next(new ApiError(400, error.message))

    const existingInstructor = await Instructor.findOne({ email: instructorDetails.email })
    if (existingInstructor && existingInstructor.isVerified) return next(new ApiError(400, "You're already registered. Please log in with your credentials."))

    let instructor = existingInstructor
    if (!instructor) {
        const { name, email, password } = instructorDetails
        instructor = await Instructor.create({
            name,
            email,
            password,
            profilePicture: USER_DEFAULT_IMG
        })
    }

    if (!instructor) return next(new ApiError(500, "Something went wrong while registering the user"))

    let OTPNumber = Math.floor(100000 + Math.random() * 900000);
    console.log(`OTP sent to user: ${OTPNumber}`)

    await OTP.create({
        userId: instructor?._id,
        OTP: OTPNumber,
    })

    setTimeout(async () => {
        await OTP.deleteOne({ userId: instructor?._id })
    }, 60000);

    await sendMail({
        email: instructor.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationContent(instructor.name, OTPNumber),
    });

    return res.json(new ApiResponse(201, instructor._id, `Verification Email has been sent`))

})

const verifyInstructorEmail = asyncHandler(async (req, res, next) => {

    const { OTP: inputOTP, instructorId } = req.body
    if (!inputOTP) return next(new ApiError(400, "Please enter the OTP to proceed with verification"))

    const otp = await OTP.findOne({ userId: instructorId })
    if (!otp) return next(new ApiError(400, "The OTP has expired. Please click 'Resend OTP' to receive a new one."))

    if (! await isOTPCorrect(inputOTP, otp.OTP)) return next(new ApiError(400, "The OTP entered is invalid. Please check and try again."))

    await Instructor.updateOne({ _id: instructorId }, { isVerified: true })
    const instructor = await Instructor.findOne({ _id: instructorId }, {
        name: 1, email: 1
    }) as IInstructor

    const result = await getAccessTokenAndRefreshToken(instructor as IUser, next) // Passing next for error handler
    const { accessToken, refreshToken } = result as ITokens

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, instructor, "Instructor logged In Successfully"))
})

const loginInstructor = asyncHandler(async (req, res, next) => {

    const loginDetails: IInstructorDetails = req.body

    const { error } = userLoginValidatorSchema.validate(loginDetails)
    if (error) return next(new ApiError(422, "Please check your input and try again."))

    const instructor = await Instructor.findOne({ email: loginDetails.email, isVerified: true })
    if (!instructor) return next(new ApiError(401, "The email address or password you entered does not match our records."))

    if (instructor.isBlocked) return next(new ApiError(403, "Your account has been blocked. Please contact support for more information"))

    if (! await isPasswordCorrect(loginDetails.password, instructor.password)) {
        return next(new ApiError(401, "The email address or password you entered does not match our records."))
    }

    const instructorDetails = await Instructor.findOne({ _id: instructor._id }, {
        name: 1, email: 1, profilePicture: 1, bio: 1
    }) as IInstructor

    const result = await getAccessTokenAndRefreshToken(instructor as IUser, next) // Passing next for error handler
    const { accessToken, refreshToken } = result as ITokens

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, instructorDetails, "Instructor logged In Successfully"))

})

const resendOTP = asyncHandler(async (req, res, next) => {
    const { instructorId } = req.body
    if (!instructorId) return next(new ApiError(500, "Something went wrong while registering the user"))

    const instructor = await Instructor.findById(instructorId)
    if (!instructor) return next(new ApiError(500, "Something went wrong while registering the user"))

    await OTP.deleteOne({ userId: instructor._id }) // Deleting the OTP if already exists

    let OTPNumber = Math.floor(100000 + Math.random() * 900000);
    console.log(`OTP sent to user: ${OTPNumber}`)

    await OTP.create({
        userId: instructor?._id,
        OTP: OTPNumber,
    })

    setTimeout(async () => {
        await OTP.deleteOne({ userId: instructor?._id })
    }, 60000);

    await sendMail({
        email: instructor.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationContent(instructor.name, OTPNumber),
    });

    return res.json(new ApiResponse(200, instructor._id, `Verification Email has been sent`))
})

const getLoggedInInstructor = asyncHandler(async (req, res, next) => {
    const { user } = req as ICustomRequest

    const instructor = await Instructor.findOne({ _id: user._id }, {
        name: 1, email: 1, profilePicture: 1, bio: 1
    }) as IInstructor

    return res.json(new ApiResponse(200, instructor, "User data fetched Successfully"))
})

const updateProfile = asyncHandler(async (req, res, next) => {
    const { name, bio, imageRemoved } = req.body
    if (!req.user) return

    if (!/^[A-Za-z][A-Za-z\s]{1,28}$/.test(name)) {
        return next(new ApiError(400, "Name should only include alphabetic characters."))
    }
    if (!/^[\w\s\., !?'"-]{1,200}$/.test(bio)) {
        return next(new ApiError(400, "Bio: 1-200 characters, letters, numbers, and punctuation allowed."))
    }

    let instructor = await Instructor.findById(req.user._id)
    if (!instructor) return

    if (imageRemoved) instructor.profilePicture = USER_DEFAULT_IMG
    instructor.name = name
    instructor.bio = bio

    if (req.file) {
        const image = await uploadOnCloudinary(req.file.path) as { url: string };
        instructor.profilePicture = image.url
    }

    await instructor.save()

    const updatedInstructor = await Instructor.findOne({ _id: instructor._id },
        { name: 1, email: 1, profilePicture: 1, bio: 1 }
    )
    return res.json(new ApiResponse(200, { instructor: updatedInstructor }, "Your profile has been updated successfully!"))
})

const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) return
    if (!req.user) return

    const instructor = await Instructor.findById(req.user._id)
    if (!instructor) return
    if (!await isPasswordCorrect(oldPassword, instructor.password)) {
        return next(new ApiError(400, "The password you entered does not match our records."))
    }

    instructor.password = newPassword
    await instructor.save()

    return res.json(new ApiResponse(200, {}, "Password updated successfully."))
})

const logoutInstructor = asyncHandler(async (req, res) => {
    if (!req.user) return

    await Instructor.findByIdAndUpdate(req.user._id, {
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
    registerInstructor,
    verifyInstructorEmail,
    loginInstructor,
    getLoggedInInstructor,
    resendOTP,
    updateProfile,
    updatePassword,
    logoutInstructor
}