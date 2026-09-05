import { cloudflare } from "@zap-studio/env/presets";
import { z } from "zod";

export const schema = {
  extends: [cloudflare],
  server: {
    CLERK_SECRET_KEY: z.string().startsWith("sk_"),
    POSTHOG_API_KEY: z.string().startsWith("phc_"),
    RESEND_API_KEY: z.string().startsWith("re_"),
    SENTRY_DSN: z.url().optional(),
    STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
    STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  },
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
    VITE_POSTHOG_HOST: z.url().default("https://eu.i.posthog.com"),
    VITE_POSTHOG_KEY: z.string().startsWith("phc_"),
    VITE_SENTRY_DSN: z.url().optional(),
    VITE_SITE_URL: z.url().optional(),
  },
  clientPrefix: "VITE_",
} as const;
