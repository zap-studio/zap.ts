"use client";
import "client-only";

import { AnalyticsProvider } from "@zap/analytics/providers";
import { BaseProviders } from "@zap/ui/providers/base";
import { analytics } from "@/lib/zap";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BaseProviders>
      <AnalyticsProvider config={analytics}>{children}</AnalyticsProvider>
    </BaseProviders>
  );
}
