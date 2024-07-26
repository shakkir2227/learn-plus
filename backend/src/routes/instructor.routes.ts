import { Router } from "express";
import {
    registerInstructor,
    verifyInstructorEmail,
    loginInstructor,
    getLoggedInInstructor,
    resendOTP,
    updateProfile,
    updatePassword,
    logoutInstructor
} from "../controllers/instructor.controller";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { UserRoles } from "../constants";
import { upload } from "../middlewares/multer.middleware";

const router = Router()

router.route("/register").post(registerInstructor)
router.route("/verify-email").post(verifyInstructorEmail)
router.route("/login").post(loginInstructor)
router.route("/get-loggedIn-instructor").get(verifyJWT, verifyPermission([UserRoles.instructor]), getLoggedInInstructor)
router.route("/resend-otp").post(resendOTP)
router.route("/update-profile").patch(verifyJWT, verifyPermission([UserRoles.instructor]), upload.single("profilePicture"), updateProfile)
router.route("/update-password").patch(verifyJWT, verifyPermission([UserRoles.instructor]), updatePassword)
router.route("/logout").post(verifyJWT, logoutInstructor)


export default router

