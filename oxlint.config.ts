import base from "@zap-studio/oxlint/base";
import jsxRuntimeAutomatic from "@zap-studio/oxlint/jsx-runtime-automatic";
import react from "@zap-studio/oxlint/react";
import reactA11y from "@zap-studio/oxlint/react-a11y";
import reactDoctor from "@zap-studio/oxlint/react-doctor";
import reactPerf from "@zap-studio/oxlint/react-perf";
import tanstackRouter from "@zap-studio/oxlint/tanstack-router";
import tanstackStart from "@zap-studio/oxlint/tanstack-start";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [
    base,
    react,
    reactA11y,
    reactPerf,
    reactDoctor,
    jsxRuntimeAutomatic,
    tanstackRouter,
    tanstackStart,
  ],
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
