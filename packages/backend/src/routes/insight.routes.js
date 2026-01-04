// packages/backend/src/routes/insight.routes.js
import { Router } from "express";
import { getRiskTrendForIdea } from "../controllers/insight.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/ideas/:ideaId/risk-trend", authRequired, getRiskTrendForIdea);

export default router;

