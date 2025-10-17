import { defineConfig } from "vitest/config";

export const sharedConfig = defineConfig({
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
});
