// packages/frontend/src/components/Dashboard/MilestoneList.jsx
import { useEffect, useState } from "react";
import { milestoneApi } from "../../api/milestoneApi";

const STATUS_LABELS = {
  PLANNED: "Planned",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed"
};

export default function MilestoneList({ ideaId }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ideaId]);

  if (!ideaId)
    return <p className="text-sm text-gray-500">Select an idea to view milestones.</p>;
  if (loading) return <p className="text-sm text-gray-500">Loading milestones...</p>;
  if (!milestones.length)
    return <p className="text-sm text-gray-500">No milestones yet.</p>;

  return (
    <div className="border rounded p-3 bg-white">
      <h3 className="text-sm font-semibold mb-2">Milestones</h3>
      <ul className="space-y-1 text-sm">
        {milestones.map((m) => (
          <li
            key={m._id}
            className="flex justify-between items-center border rounded px-2 py-1"
          >
            <div>
              <div className="font-medium">{m.title}</div>
              {m.description && (
                <div className="text-xs text-gray-500">{m.description}</div>
              )}
              {m.dueDate && (
                <div className="text-[11px] text-gray-400">
                  Due {new Date(m.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
            <span className="text-[11px] px-2 py-1 rounded bg-gray-100 text-gray-700">
              {STATUS_LABELS[m.status] || m.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

