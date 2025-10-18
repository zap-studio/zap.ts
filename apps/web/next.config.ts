import { composeConfig, createBaseConfig } from "@zap/next-config";
import { withBundleAnalyzer } from "@zap/next-config/plugins/bundle-analyzer";
import { withMDX } from "@zap/next-config/plugins/mdx";

const base = createBaseConfig("pwa", {
  overrides: {
    transpilePackages: [
      "@zap/analytics",
      "@zap/async-state",
      "@zap/config",
      "@zap/fonts",
      "@zap/next-config",
      "@zap/rpc",
      "@zap/pwa",
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
