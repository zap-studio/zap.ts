import { createEnv } from "@t3-oss/env-core";
import { BASE_ENV } from "@zap/env";
import { z } from "zod";

export const CRYPTO_ENV = createEnv({
  /**
   * Crypto-specific server environment variables.
   */
  server: {
    // AES encryption key in hexadecimal format
    AES_ENCRYPTION_KEY_HEX: z
      .string()
      .min(1)
      .regex(/^[0-9a-fA-F]+$/, "Must be a valid hexadecimal string")
      .describe(
        "AES encryption key in hexadecimal format for server-side encryption"
      ),
  },

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

export type CryptoEnv = typeof CRYPTO_ENV;
