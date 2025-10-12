import { PostHogProvider } from "../posthog/providers";
import type { AnalyticsConfig } from "../types";
import { VercelProvider } from "../vercel/providers";

type AnalyticsProviderProps = {
  children: React.ReactNode;
  config: AnalyticsConfig;
};

export function AnalyticsProvider({
  children,
  config,
}: AnalyticsProviderProps) {
  return (
    <PostHogProvider
      config={{
        enablePostHog: config.POSTHOG.ENABLED,
        apiKey: config.POSTHOG.API_KEY,
        host: config.POSTHOG.HOST,
      }}
    >
      {children}
      <VercelProvider
        config={{
          enableVercelAnalytics: config.VERCEL.ANALYTICS.ENABLED,
          enableVercelSpeedInsights: config.VERCEL.SPEED_INSIGHTS.ENABLED,
        }}
      />
    </PostHogProvider>
  );
}
