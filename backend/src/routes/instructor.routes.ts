import { Router } from "express";
import {
    registerInstructor,
    verifyInstructorEmail,
    loginInstructor,
    getLoggedInInstructor
} from "../controllers/instructor.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router()

router.route("/register").post(registerInstructor)
router.route("/verify-email").post(verifyInstructorEmail)
router.route("/login").post(loginInstructor)
router.route("/get-loggedIn-instructor").get(verifyJWT, getLoggedInInstructor)

export default router