import type { AnalyticsConfig } from "./types";

const __VERCEL__ = !!process.env.VERCEL;

/**
 * Create an analytics configuration object.
 *
 * @example
 * ```ts
 * import { createAnalyticsConfig } from "@zap/analytics";
 * const config = createAnalyticsConfig({
 *   POSTHOG: {
 *     ENABLED: true,
 *     API_KEY: "your-posthog-api-key", // recommended to be set via environment variable
 *     HOST: "https://app.posthog.com", // recommended to be set via environment variable
 *   }
 * });
 * ```
 */
export function createAnalyticsConfig(
  options?: Partial<AnalyticsConfig>
): AnalyticsConfig {
  return {
    POSTHOG: {
      ENABLED: options?.POSTHOG?.ENABLED ?? false,
      API_KEY: options?.POSTHOG?.API_KEY || "",
      HOST: options?.POSTHOG?.HOST || "",
    },
    VERCEL: {
      ANALYTICS: {
        ENABLED: options?.VERCEL?.ANALYTICS?.ENABLED ?? __VERCEL__,
      },
      SPEED_INSIGHTS: {
        ENABLED: options?.VERCEL?.SPEED_INSIGHTS?.ENABLED ?? __VERCEL__,
      },
    },
  };
}
