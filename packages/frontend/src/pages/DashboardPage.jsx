// packages/frontend/src/pages/DashboardPage.jsx
import { useState } from "react";
import IdeasList from "../components/Dashboard/IdeasList";
import RiskSummaryCard from "../components/Dashboard/RiskSummaryCard";
import InsightHighlights from "../components/Dashboard/InsightHighlights";
import MilestoneBoard from "../components/Collaboration/MilestoneBoard";

export default function DashboardPage() {
  const [selectedIdea, setSelectedIdea] = useState(null);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 border rounded p-3 bg-gray-50">
        <h2 className="text-sm font-semibold mb-2">Your ideas</h2>
        <IdeasList
          selectedId={selectedIdea?._id}
          onSelect={setSelectedIdea}
        />
      </div>

      <div className="col-span-2 space-y-4">
        <RiskSummaryCard idea={selectedIdea} />
        <InsightHighlights ideaId={selectedIdea?._id} />
        <MilestoneBoard ideaId={selectedIdea?._id} />
      </div>
    </div>
  );
}

