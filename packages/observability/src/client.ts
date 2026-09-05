import { feedbackIntegration, init, replayIntegration } from "@sentry/tanstackstart-react";
import { env } from "@zap-ts/environment";

init({
  dsn: env.VITE_SENTRY_DSN,
  integrations: [replayIntegration(), feedbackIntegration({ colorScheme: "system" })],
  tracesSampleRate: env.VITE_SENTRY_DSN ? 1 : 0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  enabled: Boolean(env.VITE_SENTRY_DSN),
});
