// frontend/src/components/Chat/ChatList.jsx
import { useEffect, useState } from "react";
import { chatApi } from "../../api/chatApi";

export default function ChatList({ selectedRoomId, onSelectRoom }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await chatApi.getMyRooms();
        setRooms(data);
      } catch (err) {
        console.error("Failed to load rooms", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading chats...</p>;

  if (!rooms.length)
    return <p className="text-sm text-gray-500">No conversations yet.</p>;

  return (
    <div className="space-y-1">
      {rooms.map((room) => {
        const isActive = String(room._id) === String(selectedRoomId);
        const label =
          room.idea?.title ||
          `Conversation ${String(room._id).slice(-4).toUpperCase()}`;

        return (
          <button
            key={room._id}
            type="button"
            onClick={() => onSelectRoom(room._id)}
            className={
              "w-full text-left px-3 py-2 rounded text-sm border " +
              (isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800")
            }
          >
            <div className="font-medium truncate">{label}</div>
            <div className="text-[11px] text-gray-400">
              Updated {new Date(room.updatedAt).toLocaleString()}
            </div>
          </button>
        );
      })}
    </div>
  );
}

