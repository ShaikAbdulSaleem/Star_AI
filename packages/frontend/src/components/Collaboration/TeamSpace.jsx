// packages/frontend/src/components/Collaboration/TeamSpace.jsx
import { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";

export default function TeamSpace({ team }) {
  const [me, setMe] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApi.me();
        setMe(data);
      } catch (err) {
        console.error("Failed to load current user", err);
      }
    })();
  }, []);

  if (!team) return <p className="text-sm text-gray-500">No team yet.</p>;

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Team: {team.name}</h3>
        <p className="text-xs text-gray-500">
          Members working on this idea and milestones.
        </p>
      </div>

      <ul className="space-y-1">
        {team.members.map((m) => (
          <li
            key={m.user._id}
            className="flex justify-between items-center border rounded px-3 py-1 text-sm"
          >
            <div>
              <span className="font-medium">{m.user.name}</span>{" "}
              <span className="text-xs text-gray-500">({m.role})</span>
            </div>
            {me && String(m.user._id) === String(me.id) && (
              <span className="text-[11px] text-blue-600">You</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

