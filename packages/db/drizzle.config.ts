import { defineConfig } from "drizzle-kit";

const url = process.env["DATABASE_URL"];
if (!url) {
  throw new Error("DATABASE_URL environment variable is required for drizzle-kit");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url,
  },
});
