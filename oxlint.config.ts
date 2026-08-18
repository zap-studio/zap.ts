import tanstack from "@zap-studio/oxlint/tanstack";
import testing from "@zap-studio/oxlint/testing";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [tanstack, testing],
  ignorePatterns: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/routeTree.gen.ts"],
  overrides: [
    {
      files: ["apps/web/src/routes/**"],
      rules: {
        "react-doctor/only-export-components": "off",
      },
    },
  ],
});
