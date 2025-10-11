"use client";
import "client-only";

import { ProgressProvider } from "@bprogress/next/app";
import { ThemeProvider } from "./theme.provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export function BaseProviders({ children }: ProvidersProps) {
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
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
}
