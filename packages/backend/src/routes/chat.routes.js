// packages/backend/src/routes/chat.routes.js
import { Router } from "express";
import {
  getOrCreateRoomForMatch,
  getRoomMessages,
  getMyRooms
} from "../controllers/chat.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/room-from-match", authRequired, getOrCreateRoomForMatch);
router.get("/rooms", authRequired, getMyRooms);
router.get("/rooms/:roomId/messages", authRequired, getRoomMessages);

export default router;

