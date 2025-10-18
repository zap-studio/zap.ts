import "server-only";

import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { __PROD__ } from "../constants";
import { db as dbDev } from "./db.dev";
import { db as dbProd } from "./db.prod";
import type { DatabaseSchema } from "./schema";

// FIXME: find a better way to export the correct db instance without type assertion
export const db = (
  __PROD__ ? dbProd : dbDev
) as NeonHttpDatabase<DatabaseSchema>;
