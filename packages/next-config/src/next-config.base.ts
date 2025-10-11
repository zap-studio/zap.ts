import type { NextConfig } from "next";
import type {
  BaseNextConfigOptions,
  BundleAnalyzerOptions,
  MDXOptions,
} from "./types";

/**
 * Creates a base Next.js configuration
 */
export function createBaseNextConfig(
  options: BaseNextConfigOptions = {}
): NextConfig {
  const {
    typedRoutes = true,
    additionalPageExtensions = [],
    imageRemotePatterns = [],
    transpilePackages = [],
    headers,
  } = options;

  const pageExtensions = [
    "js",
    "jsx",
    "ts",
    "tsx",
    ...additionalPageExtensions,
  ];

  return {
    typedRoutes,
    pageExtensions,
    images: {
      remotePatterns: imageRemotePatterns,
    },
    transpilePackages,
    headers,
  };
}

/**
 * Creates security headers for Next.js
 */
export function createSecurityHeaders(baseUrl?: string): NextConfig["headers"] {
  return async () => {
    const { buildCSPHeader, buildPermissionsPolicy } = await import(
      "@zap/security/utils"
    );

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: baseUrl ? `'self' ${baseUrl}`.trim() : "'self'",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: buildCSPHeader(),
          },
          {
            key: "Permissions-Policy",
            value: buildPermissionsPolicy(),
          },
        ],
      },
    ];
  };
}

/**
 * Adds service worker headers
 */
export function withServiceWorkerHeaders(config: NextConfig): NextConfig {
  const existingHeaders = config.headers;

  return {
    ...config,
    async headers() {
      const existing = existingHeaders ? await existingHeaders() : [];

      return [
        ...existing,
        {
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
        },
      ];
    },
  };
}

/**
 * Adds MDX support to Next.js config
 */
export async function withMDX(
  config: NextConfig,
  options: MDXOptions = {}
): Promise<NextConfig> {
  const createMDX = await import("@next/mdx").then((mod) => mod.default);

  const { remarkPlugins = [], rehypePlugins = [] } = options;

  const withMDXPlugin = createMDX({
    options: {
      remarkPlugins,
      rehypePlugins,
    },
  });

  return withMDXPlugin(config);
}

/**
 * Adds bundle analyzer to Next.js config
 */
export async function withBundleAnalyzer(
  config: NextConfig,
  options: BundleAnalyzerOptions = {}
): Promise<NextConfig> {
  const createBundleAnalyzer = await import("@next/bundle-analyzer").then(
    (mod) => mod.default
  );

  const { enabled = process.env.ANALYZE === "true", openAnalyzer = true } =
    options;

  const withBundleAnalyzerPlugin = createBundleAnalyzer({
    enabled,
    openAnalyzer,
  });

  return withBundleAnalyzerPlugin(config);
}

/**
 * Composes multiple Next.js config functions
 */
export function composeNextConfig(
  ...fns: Array<(config: NextConfig) => NextConfig | Promise<NextConfig>>
): (config: NextConfig) => Promise<NextConfig> {
  return async (config: NextConfig) => {
    let result = config;

    for (const fn of fns) {
      result = await fn(result);
    }

    return result;
  };
}
