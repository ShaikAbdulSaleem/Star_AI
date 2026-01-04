// packages/frontend/src/components/Dashboard/IdeasList.jsx
import { useEffect, useState } from "react";
import { ideaApi } from "../../api/ideaApi";

export default function IdeasList({ selectedId, onSelect }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ideaApi.getMyIdeas();
        setIdeas(data);
      } catch (err) {
        console.error("Failed to load ideas", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading ideas...</p>;
  if (!ideas.length)
    return <p className="text-sm text-gray-500">No ideas yet. Create one first.</p>;

  return (
    <div className="space-y-1">
      {ideas.map((idea) => {
        const active = String(idea._id) === String(selectedId);
        return (
          <button
            key={idea._id}
            type="button"
            onClick={() => onSelect(idea)}
            className={
              "w-full text-left px-3 py-2 rounded border text-sm " +
              (active
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-800")
            }
          >
            <div className="font-medium truncate">{idea.title}</div>
            <div className="text-[11px] text-gray-400">
              {idea.sector || "No sector"} · {idea.stage || "No stage"}
            </div>
          </button>
        );
      })}
    </div>
  );
}
