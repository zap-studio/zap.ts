import { createEnv } from "@t3-oss/env-core";
import { BASE_ENV } from "@zap/env";
import z from "zod";

export const AUTH_ENV = createEnv({
  /**
   * Server-side environment variables.
   */
  server: {
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
  },

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
