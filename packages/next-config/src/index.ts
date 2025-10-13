import { BASE_URL } from "@zap/config";
import { buildCSPHeader, buildPermissionsPolicy } from "@zap/security/utils";
import type { NextConfig } from "next";
import type { NextAppType } from "./types";

/**
 * Creates a base Next.js configuration object with common settings.
 * This includes security headers, image settings, and package transpilation.
 * Additional plugins can be composed with this base configuration.
 *
 * When `appType` is set to "pwa", it adds specific headers for service workers.
 */
export function createBaseConfig(appType: NextAppType = "default"): NextConfig {
  return {
    typedRoutes: true,
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    images: {
      remotePatterns: [{ protocol: "https", hostname: "avatar.vercel.sh" }],
    },
    transpilePackages: [
      "@zap/analytics",
      "@zap/async-state",
      "@zap/config",
      "@zap/fonts",
      "@zap/next-config",
      "@zap/orpc",
      "@zap/pwa",
      "@zap/rpc",
      "@zap/security",
      "@zap/seo",
      "@zap/shadcn",
      "@zap/ui",
    ],
    async headers() {
      const headers = [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: `'self' ${BASE_URL}`.trim(),
            },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "X-Frame-Options", value: "DENY" },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
            { key: "Content-Security-Policy", value: buildCSPHeader() },
            { key: "Permissions-Policy", value: buildPermissionsPolicy() },
          ],
        },
      ];

      if (appType === "pwa") {
        headers.push({
          source: "/sw.js",
          headers: [
            {
              key: "Content-Type",
              value: "application/javascript; charset=utf-8",
            },
            {
              key: "Cache-Control",
              value: "no-cache, no-store, must-revalidate",
            },
            {
              key: "Content-Security-Policy",
              value: "default-src 'self'; script-src 'self'",
            },
          ],
        });
      }

      return await Promise.resolve(headers);
    },
  };
}

/**
 * Composes a Next.js configuration by applying a series of plugins to a base configuration.
 *
 * @example
 * import { withMDX } from "@zap/next-config/plugins/mdx";
 * import { withBundleAnalyzer } from "@zap/next-config/plugins/bundle-analyzer";
 * const base = createBaseConfig("pwa");
 * export default composeConfig(base, [withMDX, withBundleAnalyzer]);
 */
export function composeConfig(
  baseConfig: NextConfig,
  plugins: Array<(config: NextConfig) => NextConfig>
): NextConfig {
  return plugins.reduce((acc, plugin) => plugin(acc), baseConfig);
}
