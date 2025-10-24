import { db } from '@olis/db'
import * as seeds from '@olis/db/seeds'

// const tables = process.env.npm_config_tables as keyof typeof schema

export async function seedOneStopSalesDb() {
  await seeds.oneStopSales.trades(db)
  await seeds.oneStopSales.solutions(db)
  await seeds.oneStopSales.variables(db)
  await seeds.oneStopSales.pricing(db)
  await seeds.oneStopSales.materials(db)
  await seeds.oneStopSales.benefitCategories(db)
  await seeds.oneStopSales.benefits(db)
  await seeds.oneStopSales.addons(db)
  await seeds.oneStopSales.x_materialBenefits(db)
  await seeds.oneStopSales.x_solutionBenefits(db)
  await seeds.oneStopSales.x_solutionMaterials(db)
  await seeds.oneStopSales.x_solutionVariables(db)
}

export async function seedCoreDb() {
  await seeds.core.licenses(db)
}

(async () => {
  switch (process.argv[2]) {
    case 'oneStopSales':
      await seedOneStopSalesDb()
      break
    case 'core':
      await seedCoreDb()
      break
    default:
      throw new Error('Invalid schema')
  }
})()
