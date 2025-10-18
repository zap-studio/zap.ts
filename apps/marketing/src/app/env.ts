import { createEnv } from "@t3-oss/env-nextjs";
import { analyticsEnv } from "@zap/analytics/env";
import { BASE_ENV } from "@zap/env";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables.
   * Never exposed to the client.
   */
  server: {
    // Site URL for SEO and metadata
    SITE_URL: z
      .string()
      .or(z.string().transform((val) => new URL(val).toString()))
      .optional()
      .describe("Primary site URL for canonical links and metadata"),

    // Analyze bundle size flag
    ANALYZE: z
      .string()
      .optional()
      .transform((val) => val === "true")
      .describe("Enable Next.js bundle analyzer"),
  },

  /**
   * Client-side environment variables.
   * Exposed to the browser with NEXT_PUBLIC_ prefix.
   */
  client: {
    // Site URL for client-side operations
    NEXT_PUBLIC_SITE_URL: z
      .string()
      .or(z.string().transform((val) => new URL(val).toString()))
      .optional()
      .describe("Site URL accessible from the client"),
  },

  /**
   * Extend environment variables from shared packages.
   * Order matters: later extends override earlier ones.
   */
  extends: [BASE_ENV, analyticsEnv],

  /**
   * Runtime environment mapping.
   * For Next.js >= 13.4.4, only client variables need to be destructured.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  /**
   * Treat empty strings as undefined.
   */
  emptyStringAsUndefined: true,

  /**
   * Skip validation during linting or when explicitly disabled.
   */
  skipValidation:
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});

export type Env = typeof env;
