import { createAnalyticsConfig } from "@zap/analytics";

export const analytics = createAnalyticsConfig({
  POSTHOG: {
    ENABLED: false, // TODO: inject with env
    API_KEY: "phc_YourApiKeyHere", // TODO: inject with env
    HOST: "https://app.posthog.com", // TODO: inject with env
  },
});
