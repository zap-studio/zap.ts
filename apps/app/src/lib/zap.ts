import { createAnalyticsConfig } from "@zap/analytics";

export const analytics = createAnalyticsConfig({
  POSTHOG: {
    ENABLED: false,
    API_KEY: "phc_YourApiKeyHere",
    HOST: "https://app.posthog.com",
  },
});
