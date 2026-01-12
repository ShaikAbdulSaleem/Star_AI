import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="h-12 flex items-center justify-between px-4 border-b bg-white">
      <div className="font-semibold text-sm">Star AI</div>
      <nav className="flex items-center gap-4 text-xs">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-medium" : "text-gray-600"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/connections"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-medium" : "text-gray-600"
          }
        >
          Connections
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-medium" : "text-gray-600"
          }
        >
          Chat
        </NavLink>
        <NavLink
          to="/insights"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-medium" : "text-gray-600"
          }
        >
          Insights
        </NavLink>
      </nav>
    </header>
  );
}

