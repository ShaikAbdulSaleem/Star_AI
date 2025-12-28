import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    market: { type: String },
    traction: { type: String },
    sector: { type: String },
    stage: { type: String }, // idea, prototype, early_revenue, etc.
    teamDescription: { type: String },
    aiRiskSummary: { type: String },
    aiRiskScores: {
      team: { type: Number, default: 0 },
      market: { type: Number, default: 0 },
      product: { type: Number, default: 0 },
      funding: { type: Number, default: 0 },
      overall: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export const Idea = mongoose.model("Idea", ideaSchema);

