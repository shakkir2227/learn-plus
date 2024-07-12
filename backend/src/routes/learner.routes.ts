import { Router } from "express";
import { loginLearner, registerLearner, verifyLearnerEmail } from "../controllers/learner.controller";

const router = Router()

router.route("/register").post(registerLearner)
router.route("/verify-email").post(verifyLearnerEmail)
router.route("/login").post(loginLearner)

export default router