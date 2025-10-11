"use client";
import "client-only";

import { BaseProviders } from "@zap/ui/providers/base";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <BaseProviders>{children}</BaseProviders>;
}
