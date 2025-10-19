import {
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const aiProviderCredentials = pgTable(
  "ai_provider_credentials",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(), // e.g. "openai", "mistral"
    model: text("model").notNull(), // e.g. "gpt-4o-mini"
    encryptedApiKey: jsonb("encrypted_api_key")
      .$type<{
        iv: string;
        encrypted: string;
      }>()
      .notNull(), // Encrypted API key
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    unique("ai_provider_credentials_user_id_provider_idx").on(
      t.userId,
      t.provider
    ),
  ]
);
