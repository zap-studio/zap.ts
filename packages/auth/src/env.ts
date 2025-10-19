import { createEnv } from "@t3-oss/env-core";
import { BASE_ENV } from "@zap/env";

export const AUTH_ENV = createEnv({
  /**
   * Client-side environment variables.
   * These are exposed to the browser with the configured prefix.
   */
  clientPrefix: "NEXT_PUBLIC_",

  client: {},

  /**
   * Extend base environment variables.
   */
  extends: [BASE_ENV],

  /**
   * Runtime environment object.
   */
  runtimeEnv: process.env,

  /**
   * Treat empty strings as undefined.
   */
  emptyStringAsUndefined: true,

  /**
   * Skip validation during linting.
   */
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});

export type AuthEnv = typeof AUTH_ENV;
