import { fileURLToPath } from "node:url";
import { composeConfig, createBaseConfig } from "@zap/next-config";
import { withBundleAnalyzer } from "@zap/next-config/plugins/bundle-analyzer";
import { withMDX } from "@zap/next-config/plugins/mdx";
import { createJiti } from "jiti";

// Validate environment variables at build time
const jiti = createJiti(fileURLToPath(import.meta.url));
jiti.import("./src/app/env");

const base = createBaseConfig("pwa", {
  overrides: {
    transpilePackages: [
      "@zap/analytics",
      "@zap/async-state",
      "@zap/auth",
      "@zap/config",
      "@zap/crypto",
      "@zap/db",
      "@zap/env",
      "@zap/fonts",
      "@zap/forms",
      "@zap/next-config",
      "@zap/rpc",
      "@zap/security",
      "@zap/seo",
      "@zap/shadcn",
      "@zap/tailwind-config",
      "@zap/typescript-config",
      "@zap/ui",
      "@zap/vitest-config",
    ],
  },
});
export default composeConfig(base, [withMDX, withBundleAnalyzer]);
