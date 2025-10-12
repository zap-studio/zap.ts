"use client";
import "client-only";

import { TanStackQueryProvider } from "@zap/async-state/tanstack-query/providers";
import { BaseProviders } from "@zap/ui/providers/base";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { queryClient } from "@/lib/tanstack-query";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <BaseProviders>
      <NuqsAdapter>
        <TanStackQueryProvider queryClient={queryClient}>
          {children}
        </TanStackQueryProvider>
      </NuqsAdapter>
    </BaseProviders>
  );
}
