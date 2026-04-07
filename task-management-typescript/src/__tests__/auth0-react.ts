export const useAuth0 = () => ({
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  loginWithRedirect: vi.fn(),
  logout: vi.fn(),
  getAccessTokenSilently: vi.fn(),
  getAccessTokenWithPopup: vi.fn(),
  getIdTokenClaims: vi.fn(),
});
