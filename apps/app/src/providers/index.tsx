"use client";
import "client-only";

import { ProgressProvider } from "@bprogress/next/app";
import { ThemeProvider } from "@zap/ui/providers/theme.provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <ProgressProvider
        color="#efb100"
        height="3px"
        options={{ showSpinner: false }}
        shallowRouting
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </ProgressProvider>
    </ThemeProvider>
  );
}
