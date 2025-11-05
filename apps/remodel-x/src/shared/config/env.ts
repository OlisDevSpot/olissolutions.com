import type { ZodError } from "zod";

import { config } from "dotenv";
import z from "zod";

config({ path: ".env.local" });

const envSchema = z.object({
  // GENERAL
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
  PORT: z.coerce.number().default(3000),

  // OLIS SOLUTIONS
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_ACCOUNTS_URL: z.string(),

  // DATABASE
  DATABASE_URL: z.string(),

  // BETTER AUTH
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_BASE_URL: z.string(),

  // RESEND
  RESEND_API_KEY: z.string(),

  // GOOGLE MAPS
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
});

export type env = z.infer<typeof envSchema>;

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let env: env;

try {
  // eslint-disable-next-line node/no-process-env
  env = envSchema.parse(process.env);
}
catch (e) {
  const error = e as ZodError;
  console.error("❌ Invalid environment variables:");
  console.error(z.flattenError(error).fieldErrors);
  process.exit(1);
}

export default env;
