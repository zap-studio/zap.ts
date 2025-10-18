import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import { type DatabaseSchema, schema } from "./schema";

const client = neon(process.env.DATABASE_URL_PROD || ""); // TODO: to change with t3-env later
export const db: NeonHttpDatabase<DatabaseSchema> = drizzle({
  client,
  schema,
});
