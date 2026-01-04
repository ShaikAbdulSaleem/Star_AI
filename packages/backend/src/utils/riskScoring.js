// packages/backend/src/utils/riskScoring.js

// Very simple heuristic scoring; replace with ML later.
export const basicRiskScoring = ({
  problem = "",
  solution = "",
  market = "",
  teamDescription = ""
}) => {
  const len = (s) => (s ? s.trim().length : 0);

  const teamRisk = len(teamDescription) < 50 ? 80 : 40;
  const marketRisk = len(market) < 50 ? 75 : 35;
  const productRisk = len(solution) < 50 ? 70 : 30;
  const fundingRisk = 60; // constant for now

  const overall = Math.round(
    (teamRisk + marketRisk + productRisk + fundingRisk) / 4
  );

  const areas = {
    team: teamRisk,
    market: marketRisk,
    product: productRisk,
    funding: fundingRisk
  };
  const highestArea = Object.entries(areas).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  return {
    team: teamRisk,
    market: marketRisk,
    product: productRisk,
    funding: fundingRisk,
    overall,
    highestArea
  };
};

