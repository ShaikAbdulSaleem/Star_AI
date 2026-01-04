// packages/frontend/src/components/Insights/RiskTrendChart.jsx
import { useEffect, useState } from "react";
import { insightApi } from "../../api/insightApi";

export default function RiskTrendChart({ ideaId }) {
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
    return <p className="text-sm text-gray-500">Select an idea to see risk trend.</p>;
  if (loading) return <p className="text-sm text-gray-500">Loading trend...</p>;
  if (!trend || !trend.scores?.length)
    return <p className="text-sm text-gray-500">No snapshots yet.</p>;

  return (
    <div className="border rounded p-4 bg-white text-sm">
      <h3 className="font-semibold mb-2">Risk snapshots</h3>
      <ul className="space-y-1 max-h-48 overflow-y-auto text-xs">
        {trend.scores.map((snap) => (
          <li
            key={snap._id}
            className="flex justify-between border rounded px-2 py-1"
          >
            <span>{new Date(snap.snapshotAt).toLocaleString()}</span>
            <span>Overall: {snap.scores.overall}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

