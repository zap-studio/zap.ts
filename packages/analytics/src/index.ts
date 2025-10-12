import type { AnalyticsConfig, AnalyticsConfigOptions } from "./types";

/**
 * Create an analytics configuration object.
 *
 * @example
 * ```ts
 * import { createAnalyticsConfig } from "@zap/analytics";
 * const config = createAnalyticsConfig({
 *   ENABLE_POSTHOG: true,
 *   ENABLE_VERCEL_ANALYTICS: false,
 *   ENABLE_VERCEL_SPEED_INSIGHTS: true,
 * });
 * ```
 */
export const createAnalyticsConfig = (
  options: AnalyticsConfigOptions
): AnalyticsConfig => ({
  ENABLE_POSTHOG: options.ENABLE_POSTHOG,
  ENABLE_VERCEL_ANALYTICS: options.ENABLE_VERCEL_ANALYTICS,
  ENABLE_VERCEL_SPEED_INSIGHTS: options.ENABLE_VERCEL_SPEED_INSIGHTS,
});
