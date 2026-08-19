import {
  base,
  jsxRuntimeAutomatic,
  react,
  reactA11y,
  reactDoctor,
  reactPerf,
  stylex,
  tanstackRouter,
  tanstackStart,
} from "@zap-studio/oxlint";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [
    base,
    react,
    reactA11y,
    reactPerf,
    reactDoctor,
    stylex,
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
