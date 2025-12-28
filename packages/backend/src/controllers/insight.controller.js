// packages/backend/src/controllers/insight.controller.js
import { RiskScore } from "../models/RiskScore.js";
import { Idea } from "../models/Idea.js";

export const getRiskTrendForIdea = async (req, res, next) => {
  try {
    const { ideaId } = req.params;

    const idea = await Idea.findOne({ _id: ideaId, owner: req.user._id });
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const scores = await RiskScore.find({ idea: ideaId }).sort({ snapshotAt: 1 });

    if (!scores.length) {
      return res.json({ improvementPercent: 0, scores: [] });
    }

    const first = scores[0].scores.overall || 0;
    const last = scores[scores.length - 1].scores.overall || 0;

    const improvementPercent =
      first === 0 ? 0 : Math.round(((first - last) / first) * 100);

    res.json({
      improvementPercent,
      scores
    });
  } catch (err) {
    next(err);
  }
};

