import react from "@zap-studio/oxlint/react";
import testing from "@zap-studio/oxlint/testing";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [react, testing],
  ignorePatterns: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/routeTree.gen.ts"],
  rules: {
    "anti-slop/no-runtime-typeof": "error",
    "anti-slop/no-unknown-parameters": "error",
    "anti-slop/no-unknown-returns": "error",
    "anti-slop/no-unsafe-dictionary-type": "error",
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
