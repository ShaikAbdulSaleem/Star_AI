// packages/frontend/src/components/Dashboard/RiskSummaryCard.jsx
export default function RiskSummaryCard({ idea }) {
  if (!idea) {
    return (
      <div className="border rounded p-4 bg-white">
        <p className="text-sm text-gray-500">
          No idea selected. Create or select a startup to see risk.
        </p>
      </div>
    );
  }

  const scores = idea.aiRiskScores || {};

  return (
    <div className="border rounded p-4 bg-white">
      <h3 className="text-sm font-semibold mb-1">{idea.title}</h3>
      <p className="text-xs text-gray-500 mb-2">
        Overall risk: <span className="font-semibold">{scores.overall ?? "-"}</span>/100
      </p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-gray-500">Team</div>
          <div className="font-medium">{scores.team ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-500">Market</div>
          <div className="font-medium">{scores.market ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-500">Product</div>
          <div className="font-medium">{scores.product ?? "-"}</div>
        </div>
        <div>
          <div className="text-gray-500">Funding</div>
          <div className="font-medium">{scores.funding ?? "-"}</div>
        </div>
      </div>
      {idea.aiRiskSummary && (
        <p className="text-[11px] text-gray-500 mt-2">{idea.aiRiskSummary}</p>
      )}
    </div>
  );
}

