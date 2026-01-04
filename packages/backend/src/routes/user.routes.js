// packages/backend/src/routes/user.routes.js
import { Router } from "express";
import { getMe, updateProfile } from "../controllers/user.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authRequired, getMe);
router.put("/me", authRequired, updateProfile);

export default router;

