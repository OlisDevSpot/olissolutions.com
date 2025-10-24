import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
  schema: ['./src/schema/one-stop-sales/index.ts', './src/schema/platform/index.ts', './src/schema/identity/index.ts'],
  schemaFilter: ['one_stop_sales', 'platform', 'identity'],
  out: './src/migrations',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
