import { Router } from "express";
import { blockOrUnblockInstructor, blockOrUnblockLearner, getAllUsers, getLoggedInAdmin, loginAdmin, logoutAdmin } from "../controllers/admin.controller";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";
import { UserRoles } from "../constants";

const router = Router()

router.route("/login").post(loginAdmin)
router.route("/get-loggedIn-admin").get(verifyJWT, verifyPermission([UserRoles.admin]), getLoggedInAdmin)
router.route("/get-all-users").get(verifyJWT, verifyPermission([UserRoles.admin]), getAllUsers)
router.route("/block-or-unblock-learner").post(verifyJWT, verifyPermission([UserRoles.admin]), blockOrUnblockLearner)
router.route("/block-or-unblock-instructor").post(verifyJWT, verifyPermission([UserRoles.admin]), blockOrUnblockInstructor)
router.route("/logout").post(verifyJWT, logoutAdmin)


export default router