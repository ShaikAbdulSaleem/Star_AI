// packages/frontend/src/components/Collaboration/DocumentsPanel.jsx

export default function DocumentsPanel({ documents = [] }) {
  if (!documents.length) {
    return (
      <p className="text-sm text-gray-500">
        No documents added yet. Share pitch decks, due diligence files, or notes here.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Shared documents</h3>
      <ul className="space-y-1 text-sm">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex justify-between items-center border rounded px-3 py-1"
          >
            <a
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {doc.name}
            </a>
            <span className="text-[11px] text-gray-400">
              {doc.type || "file"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

