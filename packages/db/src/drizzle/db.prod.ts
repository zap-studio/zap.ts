import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import { getDatabaseUrl } from "../env";
import { type DatabaseSchema, schema } from "./schema";

const url = getDatabaseUrl();
const client = neon(url);
export const db: NeonHttpDatabase<DatabaseSchema> = drizzle({
	client,
	schema,
});
