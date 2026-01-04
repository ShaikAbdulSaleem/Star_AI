// packages/frontend/src/components/Connections/ConnectionRequests.jsx
import { useEffect, useState } from "react";
import { matchApi } from "../../api/matchApi";

export default function ConnectionRequests({ onResponded }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await matchApi.getMyMatches();
      const incoming = data.filter(
        (m) => m.status === "PENDING" && m.toUser
      );
      setRequests(incoming);
    } catch (err) {
      console.error("Failed to load requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRespond = async (id, action) => {
    try {
      await matchApi.respond(id, action);
      await load();
      onResponded?.();
    } catch (err) {
      console.error("Failed to respond", err);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (!requests.length)
    return <p className="text-sm text-gray-500">No pending requests.</p>;

  return (
    <div className="space-y-2">
      {requests.map((m) => (
        <div
          key={m._id}
          className="border rounded px-3 py-2 flex justify-between items-center text-sm"
        >
          <div>
            <p className="font-medium">
              {m.fromUser?.name} ({m.fromUser?.role})
            </p>
            {m.contextIdea && (
              <p className="text-xs text-gray-500">
                Idea: {m.contextIdea.title}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 rounded text-xs bg-green-600 text-white"
              onClick={() => handleRespond(m._id, "ACCEPT")}
            >
              Accept
            </button>
            <button
              className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-700"
              onClick={() => handleRespond(m._id, "REJECT")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

