"use client";
import "client-only";

import { BaseProviders } from "@zap/ui/providers/base";
import { NuqsAdapter } from "nuqs/adapters/next/app";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <BaseProviders>
      <NuqsAdapter>{children}</NuqsAdapter>
    </BaseProviders>
  );
}
