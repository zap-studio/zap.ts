import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { DatabaseUrls } from "../types";
import { schema } from "./schema";
import type { Database } from "./types";

/**
 * Creates a Drizzle ORM database instance based on the provided database URLs and schema.
 *
 * @example
 * import { schema } from "./schema";
 * import { createDatabase } from "./drizzle";
 *
 * const databaseUrls = {
 *   prod: process.env.DATABASE_URL_PROD!,
 *   dev: process.env.DATABASE_URL_DEV!,
 * };
 *
 * export const db = createDatabase(databaseUrls, schema, process.env.NODE_ENV === "production"); // as NeonHttpDatabase<DatabaseSchema> to fix types
 */
export function createDatabase(
  databaseUrls: DatabaseUrls,
  prod = false
): Database {
  if (prod) {
    const client = neon(databaseUrls.prod);
    return drizzleNeon({ client, schema });
  }

  if (!databaseUrls.dev) {
    throw new Error("DATABASE_URL_DEV is required in development environment");
  }

  const pool = new Pool({ connectionString: databaseUrls.dev });
  return drizzlePg({ client: pool, schema });
}
