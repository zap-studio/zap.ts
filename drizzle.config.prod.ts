import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./configs/db/src/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
    ssl: "require",
  },
});
