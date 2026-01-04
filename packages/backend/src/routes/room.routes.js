// packages/backend/src/routes/room.routes.js
import { Router } from "express";
import {
  getOrCreateRoomForMatch,
  getMyRooms,
  getRoomById
} from "../controllers/room.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/from-match", authRequired, getOrCreateRoomForMatch);
router.get("/", authRequired, getMyRooms);
router.get("/:roomId", authRequired, getRoomById);

export default router;

