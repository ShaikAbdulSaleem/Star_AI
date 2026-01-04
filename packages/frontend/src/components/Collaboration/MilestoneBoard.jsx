// packages/frontend/src/components/Collaboration/MilestoneBoard.jsx
import { useEffect, useState } from "react";
import { milestoneApi } from "../../api/milestoneApi";

const STATUS_LABELS = {
  PLANNED: "Planned",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed"
};

export default function MilestoneBoard({ ideaId }) {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!ideaId) return;
    setLoading(true);
    try {
      const { data } = await milestoneApi.getForIdea(ideaId);
      setMilestones(data);
    } catch (err) {
      console.error("Failed to load milestones", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [ideaId]);

  const grouped = {
    PLANNED: [],
    IN_PROGRESS: [],
    COMPLETED: []
  };
  milestones.forEach((m) => {
    grouped[m.status]?.push(m);
  });

  if (!ideaId)
    return <p className="text-sm text-gray-500">Select an idea to see milestones.</p>;
  if (loading) return <p className="text-sm text-gray-500">Loading milestones...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.keys(grouped).map((status) => (
        <div key={status} className="border rounded p-3 bg-gray-50">
          <h3 className="text-sm font-semibold mb-2">
            {STATUS_LABELS[status]}{" "}
            <span className="text-xs text-gray-400">
              ({grouped[status].length})
            </span>
          </h3>
          <div className="space-y-2">
            {grouped[status].map((m) => (
              <div
                key={m._id}
                className="bg-white border rounded px-2 py-1 text-xs"
              >
                <div className="font-medium">{m.title}</div>
                {m.description && (
                  <div className="text-[11px] text-gray-500">
                    {m.description}
                  </div>
                )}
                {m.dueDate && (
                  <div className="text-[10px] text-gray-400">
                    Due {new Date(m.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
            {!grouped[status].length && (
              <p className="text-[11px] text-gray-400">No items.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

