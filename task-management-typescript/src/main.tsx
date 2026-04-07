/* eslint-disable react-refresh/only-export-components */
/* @vite-ignore */
// src/main.tsx
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Auth0ProviderWithNavigate } from "./Auth0Provider";
import { TaskProvider } from "./TaskProvider";

// Lazy loaded routes
const Dashboard = lazy(() => import("./Dashboard"));
const ViewTaskDetails = lazy(() => import("./ViewTaskDetails"));
const Callback = lazy(() => import("./Callback"));

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
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/dashboard" element={<ProtectedDashboard />} />
              <Route path="/tasks/:id" element={<ProtectedTaskDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </TaskProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>,
);
