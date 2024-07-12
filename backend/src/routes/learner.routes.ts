import { Router } from "express";
import { getLoggedInLearner, loginLearner, registerLearner, verifyLearnerEmail } from "../controllers/learner.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route("/register").post(registerLearner)
router.route("/verify-email").post(verifyLearnerEmail)
router.route("/login").post(loginLearner)
router.route("/get-loggedIn-learner").get(verifyJWT, getLoggedInLearner)

export default router