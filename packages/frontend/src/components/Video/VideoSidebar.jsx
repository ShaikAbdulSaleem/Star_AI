// packages/frontend/src/components/Video/VideoSidebar.jsx

export default function VideoSidebar({ participants = [] }) {
  if (!participants.length) {
    return (
      <div className="border rounded p-3 bg-white text-xs text-gray-500">
        No participants yet.
      </div>
    );
  }

  return (
    <div className="border rounded p-3 bg-white text-xs space-y-2">
      <h3 className="font-semibold text-sm mb-1">Participants</h3>
      <ul className="space-y-1">
        {participants.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border rounded px-2 py-1"
          >
            <span>{p.name}</span>
            <span className="text-[10px] text-gray-400">
              {p.role || "Guest"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
