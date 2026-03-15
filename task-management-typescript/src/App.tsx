// src/App.tsx
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <section id="hero">
      <div id="hero-content">
        <h1>Task Management App</h1>
        <p>Organize your tasks efficiently and boost your productivity.</p>
        <button
          type="button"
          disabled={isLoading}
          onClick={() =>
            loginWithRedirect({
              appState: { returnTo: "/dashboard" },
              authorizationParams: {
                redirect_uri: `${window.location.origin}/callback`,
              },
            })
          }
        >
          {isLoading ? "Loading..." : "Get Started"}
        </button>
      </div>
    </section>
  );
}

export default App;
