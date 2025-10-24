import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
  schema: ['./src/schema/one-stop-sales/index.ts', './src/schema/core/index.ts'],
  schemaFilter: ['one_stop_sales', 'public'],
  tablesFilter: ['*'],
  out: './src/migrations',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
