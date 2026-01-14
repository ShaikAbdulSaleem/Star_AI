import TeamSpace from "../components/Collaboration/TeamSpace";
import DocumentsPanel from "../components/Collaboration/DocumentsPanel";
import MilestoneBoard from "../components/Collaboration/MilestoneBoard";

// For now, accept props; later you can fetch team/idea data via APIs or route state.
export default function TeamPage({ team, ideaId, documents = [] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Team</h2>
        <TeamSpace team={team} />
      </div>
      <div className="col-span-1 border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Documents</h2>
        <DocumentsPanel documents={documents} />
      </div>
      <div className="col-span-1 border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Milestones</h2>
        <MilestoneBoard ideaId={ideaId} />
      </div>
    </div>
  );
}

