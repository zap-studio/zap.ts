import "server-only";

import {
  drizzle as drizzlePg,
  type NodePgDatabase,
} from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { type DatabaseSchema, schema } from "./schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL_DEV || "" }); // TODO: to change with t3-env later
export const db: NodePgDatabase<DatabaseSchema> = drizzlePg({
  client: pool,
  schema,
});
