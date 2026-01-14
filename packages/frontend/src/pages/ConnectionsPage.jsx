// packages/frontend/src/pages/ConnectionsPage.jsx
import ConnectionsList from "../components/Connections/ConnectionsList";
import ConnectionRequests from "../components/Connections/ConnectionRequests";

export default function ConnectionsPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Your connections</h2>
        <ConnectionsList />
      </div>
      <div className="border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Pending requests</h2>
        <ConnectionRequests />
      </div>
    </div>
  );
}
