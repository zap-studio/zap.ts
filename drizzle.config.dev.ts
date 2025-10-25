import "dotenv/config";

import { defineConfig } from "drizzle-kit";
import { createDrizzleConfig } from "./drizzle.config.base";

/**
 * Development environment Drizzle configuration.
 * Uses DATABASE_URL_DEV environment variable for local development.
 */

const DATABASE_URL_DEV = process.env.DATABASE_URL_DEV;

if (!DATABASE_URL_DEV) {
	throw new Error("DATABASE_URL_DEV environment variable is required");
}

export default defineConfig(createDrizzleConfig(DATABASE_URL_DEV));
