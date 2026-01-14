// packages/frontend/src/pages/IdeasPage.jsx
import IdeaInput from "../components/Onboarding/IdeaInput";
import IdeasList from "../components/Dashboard/IdeasList";

export default function IdeasPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Create / analyze idea</h2>
        <IdeaInput />
      </div>
      <div className="border rounded p-3 bg-white">
        <h2 className="text-sm font-semibold mb-2">Your ideas</h2>
        <IdeasList />
      </div>
    </div>
  );
}
