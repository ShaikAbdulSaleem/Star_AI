// packages/frontend/src/components/Dashboard/InsightHighlights.jsx
import { useEffect, useState } from "react";
import { insightApi } from "../../api/insightApi";

export default function InsightHighlights({ ideaId }) {
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ideaId) return;
    (async () => {
      setLoading(true);
      try {
        const { data } = await insightApi.getRiskTrend(ideaId);
        setTrend(data);
      } catch (err) {
        console.error("Failed to load risk trend", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [ideaId]);

  if (!ideaId)
    return <p className="text-sm text-gray-500">Select an idea to see insights.</p>;
  if (loading) return <p className="text-sm text-gray-500">Loading insights...</p>;
  if (!trend) return null;

  const improvement = trend.improvementPercent ?? 0;

  return (
    <div className="border rounded p-4 bg-white text-sm">
      <h3 className="font-semibold mb-2">AI insights</h3>
      <p className="mb-1">
        Overall risk improvement:{" "}
        <span className="font-semibold">{improvement}%</span>
      </p>
      {trend.message && (
        <p className="text-xs text-gray-500">{trend.message}</p>
      )}
    </div>
  );
}

