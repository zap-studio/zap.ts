import { APP_DESCRIPTION, NAME } from "@zap/config";
import type { MetadataRoute } from "next";
import type { PWAConfig } from "./types";

/**
 * Creates a Progressive Web App (PWA) configuration object with default settings and custom options.
 *
 * @example
 * const config = createPWAConfig("admin@example.com", {
 *   NAME: "My PWA",
 *   SHORT_NAME: "PWA",
 *   DESCRIPTION: "This is my PWA",
 * });
 */
export const createPWAConfig = (
  vapidMail: string,
  options?: Partial<PWAConfig>
): PWAConfig => ({
  NAME: options?.NAME || NAME,
  SHORT_NAME: options?.SHORT_NAME || NAME,
  DESCRIPTION: options?.DESCRIPTION || APP_DESCRIPTION,
  START_URL: options?.START_URL || "/",
  BACKGROUND_COLOR: options?.BACKGROUND_COLOR || "#ffffff",
  THEME_COLOR: options?.THEME_COLOR || "#000000",
  ICONS: options?.ICONS || [
    { src: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  VAPID_MAIL: vapidMail,
});

/**
 * Creates a PWA manifest object based on the provided configuration options.
 *
 * This function takes PWA configuration options, processes them through `createPWAConfig`,
 * and returns a manifest object compatible with Next.js MetadataRoute.Manifest type.
 * The manifest includes essential PWA properties like name, icons, theme colors, and display mode.
 *
 * @example
 * const manifest = createManifest("admin@example.com", {
 *   NAME: "My PWA",
 *   SHORT_NAME: "PWA",
 *   DESCRIPTION: "This is my PWA",
 * });
 */
export const createManifest = (
  vapidMail: string,
  options?: Partial<PWAConfig>
): MetadataRoute.Manifest => {
  const config = createPWAConfig(vapidMail, options);

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
