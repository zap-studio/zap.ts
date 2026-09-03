import { cloudflare } from "@zap-studio/env/presets";
import { z } from "zod";

export const schema = {
  extends: [cloudflare],
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    CLERK_SECRET_KEY: z.string().startsWith("sk_"),
    RESEND_API_KEY: z.string().startsWith("re_"),
    SKIP_CLERK_MIDDLEWARE: z.stringbool().optional(),
    STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
    STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
  },
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  },
  clientPrefix: "VITE_",
} as const;
