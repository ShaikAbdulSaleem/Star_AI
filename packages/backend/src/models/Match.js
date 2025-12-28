import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING"
    },
    contextIdea: { type: mongoose.Schema.Types.ObjectId, ref: "Idea" }
  },
  { timestamps: true }
);

matchSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

export const Match = mongoose.model("Match", matchSchema);

