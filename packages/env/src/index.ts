import { createEnvironment } from "@zap-studio/env";
import { cloudflare } from "@zap-studio/env/presets";
import { z } from "zod";

export const env = createEnvironment({
  extends: [cloudflare],
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    CLERK_SECRET_KEY: z.string().startsWith("sk_"),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string().startsWith("whsec_"),
  },
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  },
  clientPrefix: "VITE_",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
