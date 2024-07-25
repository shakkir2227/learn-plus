import { Router } from "express";
import { getLoggedInLearner, loginLearner, registerLearner, resendOTP, updatePassword, updateProfile, verifyLearnerEmail } from "../controllers/learner.controller";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { UserRoles } from "../constants";

const router = Router()

router.route("/register").post(registerLearner)
router.route("/verify-email").post(verifyLearnerEmail)
router.route("/login").post(loginLearner)
router.route("/get-loggedIn-learner").get(verifyJWT, verifyPermission([UserRoles.learner]), getLoggedInLearner)
router.route("/resend-otp").post(resendOTP)
router.route("/update-profile").patch(verifyJWT, verifyPermission([UserRoles.learner]), updateProfile)
router.route("/update-password").patch(verifyJWT, verifyPermission([UserRoles.learner]), updatePassword)

export default router