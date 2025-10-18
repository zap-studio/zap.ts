import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import { DB_ENV } from "../env";
import { type DatabaseSchema, schema } from "./schema";

const client = neon(DB_ENV.DATABASE_URL_PROD || DB_ENV.DATABASE_URL_DEV);
export const db: NeonHttpDatabase<DatabaseSchema> = drizzle({
  client,
  schema,
});
