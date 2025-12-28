import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["INNOVATOR", "INVESTOR"],
      required: true
    },
    sectors: [{ type: String }],
    stagePreferences: [{ type: String }],
    mindsetTags: [{ type: String }], // e.g. "long-term", "hands-on", "bootstrapped"
    ticketSizeMin: Number,
    ticketSizeMax: Number,
    bio: String,
    avatarUrl: String
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
