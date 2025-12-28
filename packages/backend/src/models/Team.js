import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String }, // e.g. CTO, CEO, Advisor
    equityNote: { type: String }
  },
  { _id: false }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: [teamMemberSchema],
    ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Idea" }]
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);

