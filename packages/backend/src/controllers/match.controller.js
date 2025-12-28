// packages/backend/src/controllers/match.controller.js
import { Match } from "../models/Match.js";
import { User } from "../models/User.js";
import { Idea } from "../models/Idea.js";

const areRolesComplementary = (a, b) =>
  (a === "INNOVATOR" && b === "INVESTOR") ||
  (a === "INVESTOR" && b === "INNOVATOR");

export const getSuggestions = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id);

    const roleToFind = me.role === "INNOVATOR" ? "INVESTOR" : "INNOVATOR";

    const candidates = await User.find({
      _id: { $ne: me._id },
      role: roleToFind,
      sectors: { $in: me.sectors || [] }
    }).select("-passwordHash");

    res.json(candidates);
  } catch (err) {
    next(err);
  }
};

export const sendRequest = async (req, res, next) => {
  try {
    const { toUserId, ideaId } = req.body;

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    if (!areRolesComplementary(req.user.role, toUser.role)) {
      return res.status(400).json({ message: "Roles are not compatible" });
    }

    let contextIdea = null;
    if (ideaId) {
      const idea = await Idea.findOne({ _id: ideaId, owner: req.user._id });
      if (!idea) {
        return res.status(404).json({ message: "Idea not found for this user" });
      }
      contextIdea = idea._id;
    }

    const match = await Match.create({
      fromUser: req.user._id,
      toUser: toUserId,
      contextIdea
    });

    res.status(201).json(match);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Request already exists" });
    }
    next(err);
  }
};

export const respondToRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // "ACCEPT" | "REJECT"

    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (String(match.toUser) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (action === "ACCEPT") {
      match.status = "ACCEPTED";
    } else if (action === "REJECT") {
      match.status = "REJECTED";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await match.save();

    res.json(match);
  } catch (err) {
    next(err);
  }
};

export const getMyMatches = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const matches = await Match.find({
      $or: [{ fromUser: userId }, { toUser: userId }]
    })
      .populate("fromUser", "name role sectors")
      .populate("toUser", "name role sectors")
      .populate("contextIdea", "title sector stage")
      .sort({ createdAt: -1 });

    res.json(matches);
  } catch (err) {
    next(err);
  }
};

