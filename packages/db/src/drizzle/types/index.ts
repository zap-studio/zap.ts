import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { DatabaseSchema } from "../schema";

export type Database =
  | NodePgDatabase<DatabaseSchema>
  | NeonHttpDatabase<DatabaseSchema>;
