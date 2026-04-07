import { vi } from "vitest";

type MockAuth0 = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: unknown;
  loginWithRedirect: (...args: unknown[]) => unknown;
  logout: (...args: unknown[]) => unknown;
  getAccessTokenSilently: (...args: unknown[]) => unknown;
  getAccessTokenWithPopup: (...args: unknown[]) => unknown;
  getIdTokenClaims: (...args: unknown[]) => unknown;
};

export const useAuth0 = (): MockAuth0 => ({
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  loginWithRedirect: vi.fn(),
  logout: vi.fn(),
  getAccessTokenSilently: vi.fn(),
  getAccessTokenWithPopup: vi.fn(),
  getIdTokenClaims: vi.fn(),
});
