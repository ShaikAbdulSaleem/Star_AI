// packages/frontend/src/hooks/useAuth.js
import { useAuth } from "../context/AuthContext";

export default function useAuthHook() {
  const ctx = useAuth();
  if (!ctx) {
    throw new Error("useAuthHook must be used inside <AuthProvider>");
  }
  return ctx;
}

