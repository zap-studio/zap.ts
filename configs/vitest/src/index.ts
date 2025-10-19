import { defineConfig, type ViteUserConfig } from "vitest/config.js";

/**
 * Creates a Vitest configuration with default settings, allowing for overrides.
 *
 * @example
 * import { createConfig } from "@zap/vitest-config";
 * import { defineConfig } from "vitest/config";
 *
 * export default defineConfig(createConfig({
 *   test: {
 *     environment: "jsdom",
 *   },
 * }));
 */
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
