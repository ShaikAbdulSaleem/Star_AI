import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-48px)] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl px-4 text-center space-y-4">
        <h1 className="text-3xl font-semibold">
          Connect innovators and investors with AI‑driven insights.
        </h1>
        <p className="text-sm text-slate-300">
          Star AI analyzes startup ideas, highlights risk, and helps you find the right partners with real‑time chat and collaboration.
        </p>
        <div className="flex justify-center gap-3 text-sm">
          <Link
            to="/onboarding"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
          >
            Get started
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded border border-slate-400 hover:bg-slate-700"
          >
            Go to app
          </Link>
        </div>
      </div>
    </div>
  );
}

