import "dotenv/config";

import { defineConfig } from "drizzle-kit";
import { createDrizzleConfig } from "./drizzle.config.base";

/**
 * Production environment Drizzle configuration.
 * Uses DATABASE_URL environment variable with SSL required for secure connections.
 */

const DATABASE_URL_PROD = process.env.DATABASE_URL_PROD;

if (!DATABASE_URL_PROD) {
  throw new Error("DATABASE_URL_PROD environment variable is required");
}

export default defineConfig(
  createDrizzleConfig(DATABASE_URL_PROD, { ssl: "require" })
);
