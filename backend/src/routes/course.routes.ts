import { Router } from "express";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { UserRoles } from "../constants";
import { upload } from "../middlewares/multer.middleware";
import { createCourse, createSubject, getAllCoursesForInstructor, getAllCoursesForLearner, getAllSubjectsForInstructor, getCourseDetails } from "../controllers/course.controller";

const router = Router()

router.route("/create-course").post(verifyJWT, verifyPermission([UserRoles.instructor]), upload.any(), createCourse)
router.route("/create-subject").post(verifyJWT, verifyPermission([UserRoles.admin]), createSubject)
router.route("/get-all-subjects").get(verifyJWT, verifyPermission([UserRoles.instructor]), getAllSubjectsForInstructor)
router.route("/get-all-courses").get(getAllCoursesForLearner)
router.route("/get-instructor-courses").get(verifyJWT, verifyPermission([UserRoles.instructor]), getAllCoursesForInstructor)
router.route("/get-courseDetails/:courseId").get(getCourseDetails)

export default router

