// packages/frontend/src/components/Insights/InsightFeed.jsx
import { useEffect, useState } from "react";
import { insightApi } from "../../api/insightApi";

export default function InsightFeed({ ideaId }) {
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
        console.error("Failed to load insights", err);
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
    <div className="border rounded p-4 bg-white text-sm space-y-2">
      <h3 className="font-semibold">Insight feed</h3>
      <p>
        Overall risk changed by{" "}
        <span className="font-semibold">{improvement}%</span> since the first
        analysis.
      </p>
      {trend.scores?.length > 1 && (
        <ul className="list-disc list-inside text-xs text-gray-600">
          <li>Use this to show investors that risk is trending down as team and milestones improve.</li>
        </ul>
      )}
    </div>
  );
}
