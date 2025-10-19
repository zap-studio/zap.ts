import { createEnv } from "@t3-oss/env-core";
import { BASE_ENV } from "@zap/env";
import { z } from "zod";

export const ANALYTICS_ENV = createEnv({
  /**
   * Client-side environment variables.
   * These are exposed to the browser with the configured prefix.
   */
  clientPrefix: "NEXT_PUBLIC_",

  client: {
    // PostHog API key for client-side tracking
    NEXT_PUBLIC_POSTHOG_API_KEY: z
      .string()
      .optional()
      .describe("PostHog API key for client-side analytics"),

    // PostHog host URL for client-side tracking
    NEXT_PUBLIC_POSTHOG_HOST: z
      .string()
      .or(z.string().transform((val) => new URL(val).toString()))
      .optional()
      .default("https://app.posthog.com")
      .describe("PostHog host URL for client-side analytics"),
  },

  /**
   * Extend base environment variables.
   */
  extends: [BASE_ENV],

  /**
   * Runtime environment object.
   */
  runtimeEnv: process.env,

  /**
   * Treat empty strings as undefined.
   */
  emptyStringAsUndefined: true,

  /**
   * Skip validation during linting.
   */
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});

export type AnalyticsEnv = typeof ANALYTICS_ENV;
