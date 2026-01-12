// packages/frontend/src/components/Matching/MatchingPanel.jsx
import { useState } from "react";
import MatchFilters from "./MatchFilters";
import MatchSuggestions from "./MatchSuggestions";
import ConnectionRequests from "../Connections/ConnectionRequests";

export default function MatchingPanel() {
  const [filters, setFilters] = useState({});

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 space-y-3">
        <MatchFilters filters={filters} onChange={setFilters} />
        {/* For MVP, MatchSuggestions ignores filters; you can wire them later */}
        <MatchSuggestions />
      </div>
      <div className="col-span-1 border rounded p-3 bg-gray-50">
        <h3 className="text-sm font-semibold mb-2">Pending requests</h3>
        <ConnectionRequests />
      </div>
    </div>
  );
}
