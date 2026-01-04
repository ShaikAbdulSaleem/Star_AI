// packages/backend/src/controllers/room.controller.js

import { Room } from "../models/Room.js";
import { Match } from "../models/Match.js";
import { Idea } from "../models/Idea.js";

/**
 * Get or create a room for a given accepted match.
 * This is the entry point when a connection is accepted
 * and users open chat/video.
 */
export const getOrCreateRoomForMatch = async (req, res, next) => {
  try {
    const { matchId } = req.body;

    if (!matchId) {
      return res.status(400).json({ message: "matchId is required" });
    }

    const match = await Match.findById(matchId);
    if (!match || match.status !== "ACCEPTED") {
      return res.status(400).json({ message: "Match not accepted or not found" });
    }

    const userId = String(req.user._id);
    const isParticipant =
      String(match.fromUser) === userId || String(match.toUser) === userId;

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

/**
 * Get all rooms for the current user (for sidebar list).
 */
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

/**
 * Optional: get a single room by id (with basic checks).
 */
export const getRoomById = async (req, res, next) => {
  try, {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate("participants", "name role")
      .populate("idea", "title sector stage");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isParticipant = room.participants.some(
      (p) => String(p._id) === String(req.user._id)
    );
    if (!isParticipant) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(room);
  } catch (err) {
    next(err);
  }
};

