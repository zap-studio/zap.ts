import type createMDX from "@next/mdx";
import type { NextConfig } from "next";
import type { ImageConfig } from "next/dist/shared/lib/image-config";

export type BaseNextConfigOptions = {
  /**
   * Enable typed routes
   * @default true
   */
  typedRoutes?: NextConfig["typedRoutes"];

  /**
   * Additional page extensions beyond the default js, jsx, ts, tsx
   * @default []
   */
  additionalPageExtensions?: NextConfig["pageExtensions"];

  /**
   * Image remote patterns configuration
   * @default []
   */
  imageRemotePatterns?: ImageConfig["remotePatterns"];

  /**
   * Packages to transpile
   * @default []
   */
  transpilePackages?: NextConfig["transpilePackages"];

  /**
   * Custom headers configuration
   * @default undefined
   */
  headers?: NextConfig["headers"];
};

export type MDXOptions = {
  /**
   * Remark plugins
   * @default []
   */
  remarkPlugins?: createMDX.NextMDXOptions["options"]["remarkPlugins"];

  /**
   * Rehype plugins
   * @default []
   */
  rehypePlugins?: createMDX.NextMDXOptions["options"]["rehypePlugins"];
};

export type BundleAnalyzerOptions = {
  /**
   * Enable bundle analyzer
   * @default process.env.ANALYZE === "true"
   */
  enabled?: boolean;

  /**
   * Open analyzer in browser automatically
   * @default true
   */
  openAnalyzer?: boolean;
};
