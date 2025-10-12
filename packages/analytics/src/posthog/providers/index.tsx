"use client";
import "client-only";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { SuspendedPostHogPageView } from "../components";

type AnalyticsProviderProps = {
  children: React.ReactNode;
  config: {
    enablePostHog: boolean;
    apiKey: string;
    host: string;
  };
};

export function AnalyticsProvider({
  children,
  config,
}: AnalyticsProviderProps) {
  useEffect(() => {
    posthog.init(config.apiKey || "", {
      api_host: config.host || "",
      capture_pageview: false, // Disable automatic pageview tracking
      capture_pageleave: true, // Enable automatic pageleave tracking
    });
  }, [config.apiKey, config.host]);

  if (!config.enablePostHog) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PostHogProvider>
  );
}
