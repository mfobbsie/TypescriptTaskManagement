// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./Dashboard";
import ViewTaskDetails from "./ViewTaskDetails";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Auth0ProviderWithNavigate from "./Auth0ProviderWithNavigate";
import { TaskProvider } from "./TaskContext";

const ProtectedDashboard = withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <p>Redirecting to login...</p>,
});

const ProtectedTaskDetails = withAuthenticationRequired(ViewTaskDetails, {
  onRedirecting: () => <p>Redirecting to login...</p>,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/callback" element={<p>Completing sign in...</p>} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
            <Route path="/tasks/:id" element={<ProtectedTaskDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TaskProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>,
);
