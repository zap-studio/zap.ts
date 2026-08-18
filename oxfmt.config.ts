import zapStudio from "@zap-studio/oxfmt/tailwind";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...zapStudio,
  ignorePatterns: ["**/routeTree.gen.ts"],
});
