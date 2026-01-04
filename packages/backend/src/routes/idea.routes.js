// packages/backend/src/routes/idea.routes.js
import { Router } from "express";
import {
  createIdea,
  updateIdea,
  getMyIdeas
} from "../controllers/idea.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authRequired, createIdea);
router.put("/:id", authRequired, updateIdea);
router.get("/mine", authRequired, getMyIdeas);

export default router;

