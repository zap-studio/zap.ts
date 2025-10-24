import { createEnv } from "@t3-oss/env-core";
import { vercel } from "@t3-oss/env-core/presets-zod";
import { z } from "zod";

export const BASE_ENV = createEnv({
	/**
	 * Shared server-side environment variables.
	 * Available in all apps and packages on the server.
	 */
	server: {
		// Node.js environment (development, production, test)
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),

		// CI/CD environment indicator
		CI: z
			.string()
			.optional()
			.transform((val) => val === "true" || val === "1"),
	},

	/**
	 * Extend environment variables from shared packages.
	 * Order matters: later extends override earlier ones.
	 */
	extends: [vercel()],

	/**
	 * Runtime environment object.
	 * Uses process.env by default.
	 */
	runtimeEnv: process.env,

	/**
	 * Treat empty strings as undefined.
	 * This is recommended for better handling of optional env vars.
	 */
	emptyStringAsUndefined: true,

	/**
	 * Skip validation during certain conditions.
	 * Set to true during linting or when building Docker images
	 * where not all env vars are present.
	 */
	skipValidation:
		!!process.env.SKIP_ENV_VALIDATION ||
		process.env.npm_lifecycle_event === "lint",
});

export type BaseEnv = typeof BASE_ENV;

export const __DEV__ = BASE_ENV.NODE_ENV === "development";
export const __PROD__ = BASE_ENV.NODE_ENV === "production";
export const __TEST__ = BASE_ENV.NODE_ENV === "test";
export const __VERCEL__ = !!BASE_ENV.VERCEL;
export const __CI__ = !!BASE_ENV.CI;
