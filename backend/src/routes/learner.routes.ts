import { Router } from "express";
import { registerLearner, verifyLearnerEmail } from "../controllers/learner.controller";

const router = Router()

router.route("/register").post(registerLearner)
router.route("/verify-email").post(verifyLearnerEmail)

export default router