import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config()

export default defineConfig({
  schema: ['./src/schema/public/index.ts', './src/schema/one-stop-sales/index.ts'],
  schemaFilter: ['public', 'one_stop_sales'],
  tablesFilter: ['*'],
  out: './src/migrations',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
