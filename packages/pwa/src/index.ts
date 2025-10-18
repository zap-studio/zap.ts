import { PWA_CONFIG } from "@zap/config/features";
import type { PWAConfig } from "@zap/config/types/features";
import type { MetadataRoute } from "next";

/**
 * Creates a PWA manifest object based on the provided configuration options.
 *
 * This function takes PWA configuration options, processes them through `createPWAConfig`,
 * and returns a manifest object compatible with Next.js MetadataRoute.Manifest type.
 * The manifest includes essential PWA properties like name, icons, theme colors, and display mode.
 *
 * @example
 * const manifest = createManifest("admin@example.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY, {
 *   NAME: "My PWA",
 *   SHORT_NAME: "PWA",
 *   DESCRIPTION: "This is my PWA",
 * });
 */
export const createManifest = (
  options?: Partial<PWAConfig>
): MetadataRoute.Manifest => {
  const config = {
    ...PWA_CONFIG,
    ...options,
  };

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
