// packages/backend/src/routes/match.routes.js
import { Router } from "express";
import {
  getSuggestions,
  sendRequest,
  respondToRequest,
  getMyMatches
} from "../controllers/match.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/suggestions", authRequired, getSuggestions);
router.post("/request", authRequired, sendRequest);
router.post("/:id/respond", authRequired, respondToRequest);
router.get("/mine", authRequired, getMyMatches);

export default router;

