import { Router } from "express";
import { getLoggedInAdmin, loginAdmin } from "../controllers/admin.controller";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware";

const router = Router()

router.route("/login").post(loginAdmin)
router.route("/get-loggedIn-admin").get(verifyJWT, verifyPermission(["Admin"]), getLoggedInAdmin)

export default router