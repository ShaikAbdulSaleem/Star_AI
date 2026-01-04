// packages/frontend/src/components/Connections/ConnectionsList.jsx
import { useEffect, useState } from "react";
import { matchApi } from "../../api/matchApi";
import { chatApi } from "../../api/chatApi";

export default function ConnectionsList({ onOpenChatRoom }) {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await matchApi.getMyMatches();
      const accepted = data.filter((m) => m.status === "ACCEPTED");
      setConnections(accepted);
    } catch (err) {
      console.error("Failed to load connections", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleOpenChat = async (matchId) => {
    try {
      const { data } = await chatApi.getOrCreateRoomFromMatch(matchId);
      onOpenChatRoom?.(data._id);
    } catch (err) {
      console.error("Failed to open room", err);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading...</p>;
  if (!connections.length)
    return <p className="text-sm text-gray-500">No connections yet.</p>;

  return (
    <div className="space-y-2">
      {connections.map((m) => {
        const other =
          m.fromUser?.role === "INNOVATOR" && m.toUser
            ? m.toUser
            : m.fromUser;
        return (
          <div
            key={m._id}
            className="border rounded px-3 py-2 flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium">
                {other?.name} ({other?.role})
              </p>
              {m.contextIdea && (
                <p className="text-xs text-gray-500">
                  Idea: {m.contextIdea.title}
                </p>
              )}
            </div>
            <button
              className="px-3 py-1 rounded text-xs bg-blue-600 text-white"
              onClick={() => handleOpenChat(m._id)}
            >
              Open chat
            </button>
          </div>
        );
      })}
    </div>
  );
}

