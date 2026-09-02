import { createEnvironment } from "@zap-studio/env";
import { cloudflare } from "@zap-studio/env/presets";
import { z } from "zod";

export const env = createEnvironment({
  extends: [cloudflare],
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    CLERK_SECRET_KEY: z.string().startsWith("sk_"),
    RESEND_API_KEY: z.string().startsWith("re_"),
  },
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
  },
  clientPrefix: "VITE_",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
