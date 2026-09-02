import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Context, Data, Layer } from "effect";
import postgres from "postgres";

const schema = {};

export class DatabaseError extends Data.TaggedError("DatabaseError")<{ cause: unknown }> {}

export class Database extends Context.Tag("Database")<
  Database,
  PostgresJsDatabase<typeof schema>
>() {}

export const DatabaseLive = (connectionString: string): Layer.Layer<Database> => {
  const client = postgres(connectionString, { max: 5, fetch_types: false });
  return Layer.succeed(Database, drizzle(client, { schema }));
};
