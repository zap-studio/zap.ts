import type { Config } from "drizzle-kit";

/**
 * Base Drizzle configuration shared across all environments.
 * Environment-specific configs extend this base configuration.
 */
export const baseDrizzleConfig = {
  out: "./drizzle",
  schema: "./packages/db/src/drizzle/schema.ts",
  dialect: "postgresql",
} as const satisfies Partial<Config>;

/**
 * Creates a Drizzle config with database credentials.
 */
export function createDrizzleConfig(
  url: string,
  options: { ssl?: "require" | boolean } = {}
): Config {
  return {
    ...baseDrizzleConfig,
    dbCredentials: {
      url,
      ...(options.ssl && { ssl: options.ssl }),
    },
  };
}
