import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
  schema: [
    './src/schema/platform/index.ts',
    './src/schema/identity/index.ts',
    './src/schema/marketplace/index.ts',
    './src/schema/remodel-x/index.ts',
  ],
  schemaFilter: [
    'platform',
    'identity',
    'marketplace',
    'remodel_x',
  ],
  out: './src/migrations',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
