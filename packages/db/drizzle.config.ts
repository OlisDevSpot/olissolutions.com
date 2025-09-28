import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config();

console.log(process.env.DATABASE_URL)

export default defineConfig({
  schema: "../shared/src/schema/index.ts",
  out: "./src/server/drizzle/migrations",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});