import { ANALYTYCS_CONFIG } from "@zap/config/features";
import { PostHogProvider } from "../posthog/providers";
import { VercelProvider } from "../vercel/providers";

type AnalyticsProviderProps = {
  children: React.ReactNode;
};

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <PostHogProvider
      config={{
        enablePostHog: ANALYTYCS_CONFIG.POSTHOG.ENABLED,
        apiKey: ANALYTYCS_CONFIG.POSTHOG.API_KEY,
        host: ANALYTYCS_CONFIG.POSTHOG.HOST,
      }}
    >
      {children}
      <VercelProvider
        config={{
          enableVercelAnalytics: ANALYTYCS_CONFIG.VERCEL.ANALYTICS.ENABLED,
          enableVercelSpeedInsights:
            ANALYTYCS_CONFIG.VERCEL.SPEED_INSIGHTS.ENABLED,
        }}
      />
    </PostHogProvider>
  );
}
