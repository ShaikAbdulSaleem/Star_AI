// packages/backend/src/controllers/chat.controller.js
import { ChatMessage } from "../models/ChatMessage.js";
import { Room } from "../models/Room.js";
import { Match } from "../models/Match.js";

export const getOrCreateRoomForMatch = async (req, res, next) => {
  try {
    const { matchId } = req.body;

    const match = await Match.findById(matchId);
    if (!match || match.status !== "ACCEPTED") {
      return res.status(400).json({ message: "Match not accepted" });
    }

    const isParticipant =
      String(match.fromUser) === String(req.user._id) ||
      String(match.toUser) === String(req.user._id);

    if (!isParticipant) {
      return res.status(403).json({ message: "Not allowed" });
    }

    let room = await Room.findOne({ match: matchId });
    if (!room) {
      room = await Room.create({
        match: matchId,
        participants: [match.fromUser, match.toUser],
        idea: match.contextIdea || null
      });
    }

    res.json(room);
  } catch (err) {
    next(err);
  }
};

export const getRoomMessages = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isParticipant = room.participants.some(
      (p) => String(p) === String(req.user._id)
    );
    if (!isParticipant) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const messages = await ChatMessage.find({ room: roomId })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const getMyRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({
      participants: req.user._id
    })
      .populate("match")
      .populate("idea", "title")
      .sort({ updatedAt: -1 });

    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

