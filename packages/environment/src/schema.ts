import { cloudflare } from "@zap-studio/env/presets";
import { z } from "zod";

export const schema = {
  extends: [cloudflare],
  server: {
    CLERK_SECRET_KEY: z.string().startsWith("sk_"),
    RESEND_API_KEY: z.string().startsWith("re_"),
    STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
    STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  },
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
    VITE_SITE_URL: z.url().optional(),
  },
  clientPrefix: "VITE_",
} as const;
