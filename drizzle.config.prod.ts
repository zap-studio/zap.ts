import "dotenv/config";

import { defineConfig } from "drizzle-kit";
import { createDrizzleConfig } from "./drizzle.config.base";

/**
 * Production environment Drizzle configuration.
 * Uses DATABASE_URL environment variable with SSL required for secure connections.
 */

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export default defineConfig(
  createDrizzleConfig(DATABASE_URL, { ssl: "require" })
);
