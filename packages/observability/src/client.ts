import { init } from "@sentry/tanstackstart-react";
import { env } from "@zap-ts/environment";

init({
  dsn: env.VITE_SENTRY_DSN,
  tracesSampleRate: env.VITE_SENTRY_DSN ? 1 : 0,
  enabled: Boolean(env.VITE_SENTRY_DSN),
});
