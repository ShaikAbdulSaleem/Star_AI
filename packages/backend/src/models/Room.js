  import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
    idea: { type: mongoose.Schema.Types.ObjectId, ref: "Idea" },
    lastMessageAt: Date
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);

