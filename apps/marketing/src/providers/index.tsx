"use client";
import "client-only";

import { PostHogProvider } from "@zap/analytics/posthog/providers";
import { VercelProvider } from "@zap/analytics/vercel/providers";
import { BaseProviders } from "@zap/ui/providers/base";
import { analytics } from "@/lib/zap";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BaseProviders>
      <PostHogProvider
        config={{
          enablePostHog: analytics.POSTHOG.ENABLED,
          apiKey: analytics.POSTHOG.API_KEY,
          host: analytics.POSTHOG.HOST,
        }}
      >
        {children}
        <VercelProvider
          config={{
            enableVercelAnalytics: analytics.VERCEL.ANALYTICS.ENABLED,
            enableVercelSpeedInsights: analytics.VERCEL.SPEED_INSIGHTS.ENABLED,
          }}
        />
      </PostHogProvider>
    </BaseProviders>
  );
}
