// packages/frontend/src/components/Matching/MatchSuggestions.jsx
import { useEffect, useState } from "react";
import { matchApi } from "../../api/matchApi";

export default function MatchSuggestions({ onConnect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await matchApi.getSuggestions();
      setSuggestions(data);
    } catch (err) {
      console.error("Failed to load suggestions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleConnect = async (userId) => {
    try {
      const { data } = await matchApi.sendRequest({ toUserId: userId });
      onConnect?.(data);
      await load();
    } catch (err) {
      console.error("Failed to send request", err);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading suggestions...</p>;

  if (!suggestions.length) {
    return (
      <p className="text-sm text-gray-500">
        No suggestions yet. Update your profile or add ideas to get better matches.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {suggestions.map((u) => (
        <div
          key={u._id}
          className="border rounded px-3 py-2 flex justify-between items-center text-sm bg-white"
        >
          <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-xs text-gray-500">
              {u.role} · {u.sectors?.join(", ") || "No sectors"}
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
            onClick={() => handleConnect(u._id)}
          >
            Connect
          </button>
        </div>
      ))}
    </div>
  );
}

