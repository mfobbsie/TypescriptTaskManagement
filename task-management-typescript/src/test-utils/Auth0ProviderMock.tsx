// src/test-utils/Auth0ProviderMock.tsx
import type { ReactNode } from "react";
import { vi } from "vitest";
import { Auth0Context } from "@auth0/auth0-react";

export function Auth0ProviderMock({ children }: { children: ReactNode }) {
  const mockValue = {
    isAuthenticated: true,
    isLoading: false,
    user: { name: "Test User" },
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    getAccessTokenSilently: vi.fn(),
    getAccessTokenWithPopup: vi.fn(),
    getIdTokenClaims: vi.fn(),
  } as any; // ⭐ THIS FIXES THE TYPE ERROR

  return (
    <Auth0Context.Provider value={mockValue}>{children}</Auth0Context.Provider>
  );
}
