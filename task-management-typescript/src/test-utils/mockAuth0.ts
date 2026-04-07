import { vi } from "vitest";
import type { Auth0ContextInterface, User } from "@auth0/auth0-react";

type MockAuth0 = Partial<Auth0ContextInterface<User>>;

export function mockAuth0(overrides: MockAuth0 = {}) {
  const baseMock: MockAuth0 = {
    isAuthenticated: false,
    isLoading: false,
    user: undefined,
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    getAccessTokenSilently: vi.fn(),
    getAccessTokenWithPopup: vi.fn(),
    getIdTokenClaims: vi.fn(),
  };

  vi.mock("@auth0/auth0-react", () => ({
    useAuth0: () => ({
      ...baseMock,
      ...overrides,
    }),
  }));
}
