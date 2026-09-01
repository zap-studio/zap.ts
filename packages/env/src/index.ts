import { createEnvironment } from "@zap-studio/env";
import { cloudflare } from "@zap-studio/env/presets";
import { z } from "zod";

export const env = createEnvironment({
  extends: [cloudflare],
  server: { BETTER_AUTH_SECRET: z.string().min(32) },
  client: {},
  clientPrefix: "VITE_",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
