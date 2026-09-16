import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./memory-migrations",
  schema: "./src/db/schema/memory.ts",
  strict: true,
});
