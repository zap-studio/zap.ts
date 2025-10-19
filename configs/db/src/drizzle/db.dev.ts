import "server-only";

import {
  drizzle as drizzlePg,
  type NodePgDatabase,
} from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { getDatabaseUrl } from "../env";
import { type DatabaseSchema, schema } from "./schema";

const url = getDatabaseUrl();
const pool = new Pool({ connectionString: url });
export const db: NodePgDatabase<DatabaseSchema> = drizzlePg({
  client: pool,
  schema,
});
