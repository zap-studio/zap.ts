import type { AnalyticsConfig, PWAConfig } from "@zap/config/types/features";
import { APP_DESCRIPTION, NAME } from ".";

const __VERCEL__ = !!process.env.VERCEL; // FIXME: move to @zap/env

export const ANALYTYCS_CONFIG: AnalyticsConfig = {
  POSTHOG: {
    ENABLED: false,
    API_KEY: "", // TODO: Add your PostHog API key here (using @zap/env)
    HOST: "", // TODO: Add your PostHog host here (using @zap/env)
  },
  VERCEL: {
    ANALYTICS: {
      ENABLED: __VERCEL__,
    },
    SPEED_INSIGHTS: {
      ENABLED: __VERCEL__,
    },
  },
};

export const PWA_CONFIG: PWAConfig = {
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
  VAPID_MAIL: "",
  VAPID_PUBLIC_KEY: "",
  VAPID_PRIVATE_KEY: "",
};
