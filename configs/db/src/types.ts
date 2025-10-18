import z from "zod";

export type DatabaseUrls = { prod: string; dev: string };

export const UpsertModeSchema = z.enum([
  "create-only",
  "update-only",
  "upsert",
]);

export type UpsertMode = z.infer<typeof UpsertModeSchema>;
