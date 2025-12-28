// packages/backend/src/controllers/idea.controller.js
import { Idea } from "../models/Idea.js";
import { RiskScore } from "../models/RiskScore.js";
import { basicRiskScoring } from "../utils/riskScoring.js";

export const createIdea = async (req, res, next) => {
  try {
    const {
      title,
      problem,
      solution,
      market,
      traction,
      sector,
      stage,
      teamDescription
    } = req.body;

    const idea = await Idea.create({
      owner: req.user._id,
      title,
      problem,
      solution,
      market,
      traction,
      sector,
      stage,
      teamDescription
    });

    // Simple AI risk scoring stub
    const scores = basicRiskScoring({ problem, solution, market, teamDescription });

    idea.aiRiskScores = scores;
    idea.aiRiskSummary = `Overall risk ${scores.overall}/100. Higher risks: ${
      scores.highestArea
    }.`;
    await idea.save();

    await RiskScore.create({
      idea: idea._id,
      scores,
      reason: "Initial AI analysis"
    });

    res.status(201).json(idea);
  } catch (err) {
    next(err);
  }
};

export const updateIdea = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await Idea.findOne({ _id: id, owner: req.user._id });
    if (!existing) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const fields = [
      "title",
      "problem",
      "solution",
      "market",
      "traction",
      "sector",
      "stage",
      "teamDescription"
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        existing[f] = req.body[f];
      }
    });

    // Recalculate risk if core fields changed
    const scores = basicRiskScoring({
      problem: existing.problem,
      solution: existing.solution,
      market: existing.market,
      teamDescription: existing.teamDescription
    });

    existing.aiRiskScores = scores;
    existing.aiRiskSummary = `Overall risk ${scores.overall}/100. Higher risks: ${
      scores.highestArea
    }.`;

    await existing.save();

    await RiskScore.create({
      idea: existing._id,
      scores,
      reason: "Updated AI analysis after edit"
    });

    res.json(existing);
  } catch (err) {
    next(err);
  }
};

export const getMyIdeas = async (req, res, next) => {
  try {
    const ideas = await Idea.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    next(err);
  }
};

