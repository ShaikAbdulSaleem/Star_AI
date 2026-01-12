// packages/frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/Layout/AppLayout";

import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { UIProvider } from "./context/UIContext";

import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import MatchingPanel from "./components/Matching/MatchingPanel";
import ConnectionsPage from "./pages/ConnectionsPage";
import InsightsPage from "./pages/InsightsPage";
import OnboardingPage from "./pages/OnboardingPage";
import IdeasPage from "./pages/IdeasPage";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <UIProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/matching" element={<MatchingPanel />} />
                <Route path="/connections" element={<ConnectionsPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/ideas" element={<IdeasPage />} />
              </Route>
            </Routes>
          </UIProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
