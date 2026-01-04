// packages/backend/src/services/matching.service.js
import { User } from "../models/User.js";

const scoreCandidate = (me, candidate) => {
  let score = 0;

  // Sector overlap
  const sectorOverlap = (me.sectors || []).filter((s) =>
    (candidate.sectors || []).includes(s)
  ).length;
  score += sectorOverlap * 20;

  // Stage/mindset rough matching
  const mindsetOverlap = (me.mindsetTags || []).filter((t) =>
    (candidate.mindsetTags || []).includes(t)
  ).length;
  score += mindsetOverlap * 10;

  return score;
};

export const findMatchesForUser = async (userId) => {
  const me = await User.findById(userId);
  if (!me) return [];

  const targetRole = me.role === "INNOVATOR" ? "INVESTOR" : "INNOVATOR";

  const candidates = await User.find({
    _id: { $ne: me._id },
    role: targetRole
  }).select("-passwordHash");

  const scored = candidates
    .map((c) => ({
      candidate: c,
      score: scoreCandidate(me, c)
    }))
    .sort((a, b) => b.score - a.score);

  return scored.map((s) => s.candidate);
};

