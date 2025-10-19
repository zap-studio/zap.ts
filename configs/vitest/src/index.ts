import type { UserConfig } from "vite";
import { defineConfig } from "vitest/config";

export const config: UserConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    // setupFiles: ["./src/test/setup.ts"], // this file allows to set up the testing environment before each test run
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
    // Other shared configuration
  },
};

/**
 * Create a Vitest configuration object with optional overrides.
 * This function merges the default configuration with any provided overrides.
 *
 * @example
 * import { createVitestConfig } from "@zap/vitest-config";
 *
 * export default createVitestConfig({
 *   test: {
 *     // Package-specific overrides
 *   },
 * });
 */
export function createVitestConfig(overrides: UserConfig = {}): UserConfig {
  return defineConfig({
    ...config,
    ...overrides,
    test: {
      ...config.test,
      ...overrides.test,
      coverage: {
        ...config.test?.coverage,
        ...overrides.test?.coverage,
      },
    },
  });
}
