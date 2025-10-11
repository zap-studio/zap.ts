import createBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import { BASE_URL } from "@zap/config";
import { buildCSPHeader, buildPermissionsPolicy } from "@zap/security/utils";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
  transpilePackages: [
    "@zap/config",
    "@zap/security",
    "@zap/seo",
    "@zap/shadcn",
    "@zap/ui",
  ],
  async headers() {
    return await Promise.resolve([
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: `'self' ${BASE_URL}`.trim(),
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
    ]);
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withMDX(nextConfig));
