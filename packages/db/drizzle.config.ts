import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config()

export default defineConfig({
  schema: ['./src/schema/core/index.ts', './src/schema/one-stop-sales/index.ts'],
  tablesFilter: ['*'],
  out: './src/migrations',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
