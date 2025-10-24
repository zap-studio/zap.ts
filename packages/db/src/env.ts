import { createEnv } from "@t3-oss/env-core";
import { BASE_ENV } from "@zap/env";
import { z } from "zod";

export const DB_ENV = createEnv({
	/**
	 * Database-specific server environment variables.
	 */
	server: {
		// Development database URL (PostgreSQL with connection pooling)
		DATABASE_URL_DEV: z
			.string()
			.describe("PostgreSQL connection string for development environment"),

		// Production database URL (Neon serverless)
		DATABASE_URL_PROD: z
			.string()
			.optional()
			.describe("Neon serverless connection string for production environment"),

		// Generic database URL (falls back based on NODE_ENV)
		DATABASE_URL: z
			.string()
			.optional()
			.describe("Generic database URL that can be used in any environment"),
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

export type DbEnv = typeof DB_ENV;

/**
 * Get the appropriate database URL based on the current environment.
 *
 * @example
 * const url = getDatabaseUrl();
 * const client = new Pool({ connectionString: url });
 */
export function getDatabaseUrl(): string {
	// If DATABASE_URL is explicitly set, use it
	if (DB_ENV.DATABASE_URL) {
		return DB_ENV.DATABASE_URL;
	}

	// Otherwise, use environment-specific URL
	if (DB_ENV.NODE_ENV === "production") {
		if (!DB_ENV.DATABASE_URL_PROD) {
			throw new Error(
				"DATABASE_URL_PROD is required in production environment",
			);
		}
		return DB_ENV.DATABASE_URL_PROD;
	}

	return DB_ENV.DATABASE_URL_DEV;
}
