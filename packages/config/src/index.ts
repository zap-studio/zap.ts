/**
 * This file contains only the core application configuration.
 *
 * ZAP:TODO
 * - Change the core configuration to your own setup
 * - Check `next-sitemap.config.js` and change the `siteUrl` to your own URL
 * - Customize open graph image generation in `src/app/opengraph-image/route.tsx`
 * - Check `public/sw.js` file and change the URL in the `clients.openWindow` function
 */

import type { ZapCoreSettings } from "./types";

export const NAME = "Zap.ts";
export const APP_NAME = `${NAME} | Build applications as fast as a zap`;
export const APP_DESCRIPTION =
  "Zap.ts is a monorepo designed to help you build applications faster using a modern set of tools.";
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://demo.zap-ts.zapstudio.dev";
export const SALES_EMAIL = "sales@example.com";
export const SUPPORT_EMAIL = "support@example.com";

export const ZAP_CORE_CONFIG: ZapCoreSettings = {
  APP: {
    NAME,
    APP_NAME,
    APP_DESCRIPTION,
    BASE_URL,
    SALES_EMAIL,
    SUPPORT_EMAIL,
    APP_URL: "/app",
  },
};
