  import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-48 border-r bg-white p-3 text-xs space-y-2">
      <p className="text-[11px] font-semibold text-gray-500 mb-1">
        Workspace
      </p>

      <NavLink
        to="/onboarding"
        className={({ isActive }) =>
          "block px-2 py-1 rounded " +
          (isActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-50")
        }
      >
        Profile setup
      </NavLink>

      <NavLink
        to="/ideas"
        className={({ isActive }) =>
          "block px-2 py-1 rounded " +
          (isActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-50")
        }
      >
        Ideas & AI analysis
      </NavLink>

      <NavLink
        to="/collaboration"
        className={({ isActive }) =>
          "block px-2 py-1 rounded " +
          (isActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-700 hover:bg-gray-50")
        }
      >
        Collaboration
      </NavLink>
    </aside>
  );
}

