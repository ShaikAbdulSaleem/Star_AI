import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema(
  {
    idea: { type: mongoose.Schema.Types.ObjectId, ref: "Idea", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ["PLANNED", "IN_PROGRESS", "COMPLETED"],
      default: "PLANNED"
    }
  },
  { timestamps: true }
);

export const Milestone = mongoose.model("Milestone", milestoneSchema);

