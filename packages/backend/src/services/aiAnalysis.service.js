// packages/backend/src/services/aiAnalysis.service.js
import { basicRiskScoring } from "../utils/riskScoring.js";

/**
 * For now, this is a lightweight “AI” layer.
 * Later you can swap this to a real ML/LLM call.
 */
export const analyzeIdea = ({ problem, solution, market, teamDescription }) => {
  const scores = basicRiskScoring({
    problem,
    solution,
    market,
    teamDescription
  });

  const summary = `Overall risk ${scores.overall}/100. Key risk area: ${
    scores.highestArea
  }.`;

  const milestones = [
    {
      title: "Validate problem & solution",
      description: "Talk to 15–20 potential customers and capture learnings.",
      type: "DISCOVERY"
    },
    {
      title: "Prototype & pilot",
      description: "Build MVP and test with 3–5 early adopters.",
      type: "PRODUCT"
    }
  ];

  return { scores, summary, milestones };
};

