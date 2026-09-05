import type { ReactNode } from "react";

import { PostHogProvider } from "@posthog/react";
import { env } from "@zap-ts/environment";

export { usePostHog } from "@posthog/react";
export { useIdentifyUser } from "./use-identify-user";

const analyticsOptions = {
  api_host: env.VITE_POSTHOG_HOST,
  person_profiles: "identified_only",
} as const;

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => (
  <PostHogProvider apiKey={env.VITE_POSTHOG_KEY} options={analyticsOptions}>
    {children}
  </PostHogProvider>
);
