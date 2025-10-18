import "server-only";

import {
  drizzle as drizzlePg,
  type NodePgDatabase,
} from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { DB_ENV } from "../env";
import { type DatabaseSchema, schema } from "./schema";

const pool = new Pool({ connectionString: DB_ENV.DATABASE_URL_DEV });
export const db: NodePgDatabase<DatabaseSchema> = drizzlePg({
  client: pool,
  schema,
});
