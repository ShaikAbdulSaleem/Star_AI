// packages/backend/src/routes/milestone.routes.js
import { Router } from "express";
import {
  createMilestone,
  updateMilestoneStatus,
  getIdeaMilestones
} from "../controllers/milestone.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authRequired, createMilestone);
router.patch("/:id/status", authRequired, updateMilestoneStatus);
router.get("/idea/:ideaId", authRequired, getIdeaMilestones);

export default router;

