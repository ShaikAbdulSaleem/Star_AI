// packages/frontend/src/components/Matching/MatchFilters.jsx

const ROLE_OPTIONS = ["INNOVATOR", "INVESTOR"];
const STAGE_OPTIONS = ["IDEA", "MVP", "EARLY_REVENUE", "GROWTH"];

export default function MatchFilters({ filters, onChange }) {
  const handleChange = (field, value) => {
    onChange?.({ ...filters, [field]: value });
  };

  return (
    <div className="border rounded p-3 bg-white text-xs space-y-2 mb-3">
      <h3 className="font-semibold text-sm">Match filters</h3>
      <div className="flex gap-2">
        <select
          className="border rounded px-2 py-1 flex-1"
          value={filters.role || ""}
          onChange={(e) => handleChange("role", e.target.value || null)}
        >
          <option value="">Any role</option>
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1 flex-1"
          value={filters.stage || ""}
          onChange={(e) => handleChange("stage", e.target.value || null)}
        >
          <option value="">Any stage</option>
          {STAGE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

