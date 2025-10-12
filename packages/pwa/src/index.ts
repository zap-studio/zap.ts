import { APP_DESCRIPTION, NAME } from "@zap/config";
import type { MetadataRoute } from "next";
import type { PWAConfig, PWAConfigOptions } from "./types";

/**
 * Creates a Progressive Web App (PWA) configuration object with default settings and custom options.
 *
 * @example
 * ```typescript
 * const config = createPWAConfig({
 *   VAPID_MAIL: 'admin@example.com'
 * });
 * ```
 */
export const createPWAConfig = (options: PWAConfigOptions): PWAConfig => ({
  NAME,
  SHORT_NAME: NAME,
  DESCRIPTION: APP_DESCRIPTION,
  START_URL: "/",
  BACKGROUND_COLOR: "#ffffff",
  THEME_COLOR: "#000000",
  ICONS: [
    { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  VAPID_MAIL: options.VAPID_MAIL,
});

/**
 * Creates a PWA manifest object based on the provided configuration options.
 *
 * This function takes PWA configuration options, processes them through `createPWAConfig`,
 * and returns a manifest object compatible with Next.js MetadataRoute.Manifest type.
 * The manifest includes essential PWA properties like name, icons, theme colors, and display mode.
 *
 * @example
 * ```typescript
 * const manifest = createManifest({
 *   VAPID_MAIL: 'admin@example.com'
 * });
 * ```
 */
export const createManifest = (
  options: PWAConfigOptions
): MetadataRoute.Manifest => {
  const config = createPWAConfig(options);

  return {
    name: config.NAME,
    short_name: config.SHORT_NAME,
    description: config.DESCRIPTION,
    start_url: config.START_URL,
    display: "standalone",
    background_color: config.BACKGROUND_COLOR,
    theme_color: config.THEME_COLOR,
    icons: config.ICONS,
  };
};
