/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "react-router": path.resolve("./node_modules/react-router"),
    },
    dedupe: ["react", "react-dom", "react-router"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
    server: {
      deps: {
        inline: ["react-router", "react-router-dom"],
      },
    },
    environmentOptions: {
      jsdom: {
        url: "http://localhost/",
      },
    },
  },
});
