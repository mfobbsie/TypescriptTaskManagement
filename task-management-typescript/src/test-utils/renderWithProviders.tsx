// src/test-utils/renderWithProviders.tsx
import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TaskProvider } from "../TaskProvider";
import { Auth0ProviderMock } from "./Auth0ProviderMock";

interface RenderOptions {
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { route = "/" }: RenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <Auth0ProviderMock>
          <TaskProvider>{children}</TaskProvider>
        </Auth0ProviderMock>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper });
}
