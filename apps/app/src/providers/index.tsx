"use client";
import "client-only";

import { AnalyticsProvider } from "@zap/analytics/providers";
import { TanStackQueryProvider } from "@zap/async-state/tanstack-query/providers";
import { BaseProviders } from "@zap/ui/providers/base";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { queryClient } from "@/lib/tanstack-query";
import { analytics } from "@/lib/zap";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BaseProviders>
      <NuqsAdapter>
        <TanStackQueryProvider queryClient={queryClient}>
          <AnalyticsProvider config={analytics}>{children}</AnalyticsProvider>
        </TanStackQueryProvider>
      </NuqsAdapter>
    </BaseProviders>
  );
}
