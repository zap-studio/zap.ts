import type { PWAConfig } from "@zap/config/types/features";
import { APP_DESCRIPTION, NAME } from ".";

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
