import type { NextConfig } from "next";

/**
 * Type of Next.js application. "pwa" enables PWA features, while "default" is a standard Next.js app.
 */
export type NextAppType = "default" | "pwa";

/**
 * Options for overriding a base Next.js configuration.
 */
export type NextConfigOptions = {
  /**
   * Override or extend any Next.js config properties.
   * These will be deeply merged with the base configuration.
   */
  overrides?: Partial<NextConfig>;
};
