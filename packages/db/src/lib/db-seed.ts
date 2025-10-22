import { db } from '@olis/db'
import * as seeds from '@olis/db/seeds'

// const tables = process.env.npm_config_tables as keyof typeof schema

const seedFunctions = {
  ...seeds.core,
  ...seeds.oneStopSales,
}

export async function seedDb(tables: string[]) {
  for (const table of tables) {
    await seedFunctions[table as keyof typeof seedFunctions](db)
  }
}
