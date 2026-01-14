// packages/frontend/src/pages/InsightsPage.jsx
import { useState } from "react";
import IdeasList from "../components/Dashboard/IdeasList";
import InsightHighlights from "../components/Dashboard/InsightHighlights";
import RiskTrendChart from "../components/Insights/RiskTrendChart";
import InsightFeed from "../components/Insights/InsightFeed";

export default function InsightsPage() {
  const [selectedIdea, setSelectedIdea] = useState(null);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 border rounded p-3 bg-gray-50">
        <h2 className="text-sm font-semibold mb-2">Select idea</h2>
        <IdeasList
          selectedId={selectedIdea?._id}
          onSelect={setSelectedIdea}
        />
      </div>
      <div className="col-span-2 space-y-4">
        <InsightHighlights ideaId={selectedIdea?._id} />
        <RiskTrendChart ideaId={selectedIdea?._id} />
        <InsightFeed ideaId={selectedIdea?._id} />
      </div>
    </div>
  );
}

