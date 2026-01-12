// packages/frontend/src/hooks/useMatches.js
import { useEffect, useState } from "react";
import { matchApi } from "../api/matchApi";

export default function useMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await matchApi.getMyMatches();
      setMatches(data);
    } catch (err) {
      console.error("Failed to load matches", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const pending = matches.filter((m) => m.status === "PENDING");
  const accepted = matches.filter((m) => m.status === "ACCEPTED");

  return {
    matches,
    pending,
    accepted,
    loading,
    reload: load
  };
}

