import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    getAccessTokenSilently: vi.fn(),
    getAccessTokenWithPopup: vi.fn(),
    getIdTokenClaims: vi.fn(),
  }),
}));

test("renders landing title", () => {
  render(<App />);
  expect(screen.getByText(/Task Management App/i)).toBeInTheDocument();
});
