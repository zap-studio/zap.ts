import tanstack from "@zap-studio/oxlint/tanstack";
import testing from "@zap-studio/oxlint/testing";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [tanstack, testing],
  ignorePatterns: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/routeTree.gen.ts"],
  rules: {
    // tsconfig uses jsx: "react-jsx" (automatic runtime); @zap-studio/oxlint's
    // react preset hardcodes this rule ("warn") for the classic runtime, so
    // safe to turn off here.
    "react-doctor/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["apps/web/src/routes/**"],
      rules: {
        "react-doctor/only-export-components": "off",
      },
    },
  ],
});
