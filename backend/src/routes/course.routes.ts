import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { UserRoles } from "../constants";
import { upload } from "../middlewares/multer.middleware";
import { createCourse } from "../controllers/course.controller";

const router = Router()

router.route("/create-course").post(verifyJWT, verifyPermission([UserRoles.instructor]), upload.any(), createCourse)

export default router

