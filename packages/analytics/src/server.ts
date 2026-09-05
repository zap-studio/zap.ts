import { env } from "@zap-ts/environment";
import { PostHog } from "posthog-node";

export const createServerPostHog = () =>
  new PostHog(env.POSTHOG_API_KEY, {
    host: env.VITE_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
