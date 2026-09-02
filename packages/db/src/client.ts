import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Context, Data, Effect, Layer } from "effect";
import postgres from "postgres";

import { schema } from "./schema";

export class DatabaseError extends Data.TaggedError("DatabaseError")<{ cause: unknown }> {}

export class Database extends Context.Tag("Database")<
  Database,
  PostgresJsDatabase<typeof schema>
>() {}

export const DatabaseLive = (connectionString: string): Layer.Layer<Database> =>
  Layer.scoped(
    Database,
    Effect.acquireRelease(
      Effect.sync(() => postgres(connectionString, { max: 5, fetch_types: false })),
      (client) => Effect.promise(() => client.end()),
    ).pipe(Effect.map((client) => drizzle(client, { schema }))),
  );
