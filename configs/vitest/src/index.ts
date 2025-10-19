import { defineConfig, type ViteUserConfig } from "vitest/config.js";

export function createConfig(overrides: Partial<ViteUserConfig> = {}) {
  return defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: [
          "node_modules/",
          "dist/",
          "**/*.config.{ts,js}",
          "**/*.d.ts",
          "**/test/**",
        ],
      },
      mockReset: true,
      restoreMocks: true,
      clearMocks: true,
      include: ["**/*.{test,spec}.{ts,tsx}"],
      exclude: ["node_modules", "dist", ".next", ".turbo"],
      ...overrides.test,
    },
    ...overrides,
  });
}
