import type { NextConfig } from "next";

/**
 * Type of Next.js application. "pwa" enables PWA features, while "default" is a standard Next.js app.
 */
export type NextAppType = "default" | "pwa";

export type NextConfigOptions = {
  transpilePackages?: NextConfig["transpilePackages"];
};
