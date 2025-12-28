import mongoose from "mongoose";

const riskScoreSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    snapshotAt: { type: Date, default: Date.now },
    scores: {
      team: Number,
      market: Number,
      product: Number,
      funding: Number,
      overall: Number
    },
    reason: String // e.g. "Added CTO with 5y experience"
  },
  { timestamps: true }
);

export const RiskScore = mongoose.model("RiskScore", riskScoreSchema);

