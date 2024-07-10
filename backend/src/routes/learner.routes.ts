import { Router } from "express";
import { registerLearner } from "../controllers/learner.controller";

const router = Router()

router.route("/register").post(registerLearner)

export default router