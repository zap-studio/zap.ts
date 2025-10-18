import type { AnalyticsConfig } from "./types";

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
