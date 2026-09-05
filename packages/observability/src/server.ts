import {
  getClient,
  init,
  sentryGlobalFunctionMiddleware,
  sentryGlobalRequestMiddleware,
} from "@sentry/tanstackstart-react";
import { env } from "@zap-ts/environment";
import { Context, Effect, Layer } from "effect";

export { sentryGlobalFunctionMiddleware, sentryGlobalRequestMiddleware };

init({
  dsn: env.SENTRY_DSN,
  tracesSampleRate: env.SENTRY_DSN ? 1 : 0,
  enabled: Boolean(env.SENTRY_DSN),
});

export class ServerObservability extends Context.Tag("ServerObservability")<
  ServerObservability,
  NonNullable<ReturnType<typeof getClient>>
>() {}

export const ServerObservabilityLive: Layer.Layer<ServerObservability> = Layer.scoped(
  ServerObservability,
  Effect.acquireRelease(
    Effect.sync(() => {
      const client = getClient();

      if (!client) {
        throw new Error("Sentry client is not initialized");
      }

      return client;
    }),
    (client) => Effect.promise(() => client.close()),
  ),
);
