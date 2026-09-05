import { env } from "@zap-ts/environment";
import { Context, Effect, Layer } from "effect";
import { PostHog } from "posthog-node";

export class ServerAnalytics extends Context.Tag("ServerAnalytics")<ServerAnalytics, PostHog>() {}

export const ServerAnalyticsLive: Layer.Layer<ServerAnalytics> = Layer.scoped(
  ServerAnalytics,
  Effect.acquireRelease(
    Effect.sync(
      () =>
        new PostHog(env.POSTHOG_API_KEY, {
          host: env.VITE_POSTHOG_HOST,
          flushAt: 1,
          flushInterval: 0,
        }),
    ),
    (client) => Effect.promise(() => client.shutdown()),
  ),
);
