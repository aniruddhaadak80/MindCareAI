import { defineConfig } from "vitest/config";
import path from "path";

// Vitest runs the pure logic of the app (helpers in `src/lib`, reducers and
// other framework-free modules) in a plain node environment.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    globals: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/lib/**", "src/hooks/**"],
    },
  },
});
