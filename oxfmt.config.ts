import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["**/routeTree.gen.ts", "tools/oxlint/anti-slop/**"],
  sortImports: {
    groups: [
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
    newlinesBetween: true,
  },
  sortPackageJson: true,
  sortTailwindcss: {
    stylesheet: "./apps/web/src/styles.css",
    functions: ["clsx", "cn"],
  },
});
