import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv"

dotenv.config();

export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./src/schema.ts",
  out: "./drizzle",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DB_URL as string,
  }
});