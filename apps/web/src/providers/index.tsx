"use client";
import "client-only";

import { AnalyticsProvider } from "@zap/analytics/providers";
import { orpcQueryClient } from "@zap/async-state/tanstack-query/orpc";
import { TanStackQueryProvider } from "@zap/async-state/tanstack-query/providers";
import { BaseProviders } from "@zap/ui/providers/base";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BaseProviders>
      <NuqsAdapter>
        <TanStackQueryProvider queryClient={orpcQueryClient}>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </TanStackQueryProvider>
      </NuqsAdapter>
    </BaseProviders>
  );
}
