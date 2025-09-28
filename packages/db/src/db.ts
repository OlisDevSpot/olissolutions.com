import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@workspace/shared/schema";

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool, {
  // eslint-disable-next-line node/no-process-env
  logger: process.env.npm_config_logger === "true",
  schema,
});

export const myName = "Oliver";

export type DB = typeof db;
export { db };