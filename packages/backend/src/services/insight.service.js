// packages/backend/src/services/insight.service.js
import { RiskScore } from "../models/RiskScore.js";

/**
 * Compute improvement % and basic narrative.
 */
export const computeRiskImprovement = async (ideaId) => {
  const scores = await RiskScore.find({ idea: ideaId }).sort({
    snapshotAt: 1
  });

  if (!scores.length) {
    return {
      improvementPercent: 0,
      message: "No risk snapshots yet.",
      scores
    };
  }

  const first = scores[0].scores.overall || 0;
  const last = scores[scores.length - 1].scores.overall || 0;

  const improvementPercent =
    first === 0 ? 0 : Math.round(((first - last) / first) * 100);

  let message = "Risk profile unchanged.";
  if (improvementPercent > 0) {
    message = `Overall risk improved by ${improvementPercent}% over time.`;
  } else if (improvementPercent < 0) {
    message = `Overall risk worsened by ${Math.abs(improvementPercent)}%.`;
  }

  return {
    improvementPercent,
    message,
    scores
  };
};

