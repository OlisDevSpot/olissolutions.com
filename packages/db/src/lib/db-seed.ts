import { db } from '@olis/db'
import * as seeds from '@olis/db/seeds'

// const tables = process.env.npm_config_tables as keyof typeof schema

export async function seedOneStopSalesDb() {
  await seeds.oneStopSales.variables(db)
  await seeds.oneStopSales.pricing(db)
  await seeds.oneStopSales.x_scopeVariables(db)
}

export async function seedIdentityDb() {
  await seeds.identity.licenses(db)
}

export async function seedPlatformDb() {
  await seeds.platform.trades(db)
  await seeds.platform.scopes(db)
  await seeds.platform.addons(db)
  await seeds.platform.benefitCategories(db)
  await seeds.platform.benefits(db)
  await seeds.platform.materials(db)
  await seeds.platform.x_materialBenefits(db)
  await seeds.platform.x_scopeBenefits(db)
  await seeds.platform.x_scopeMaterials(db)
}

export async function seedMarketplaceDb() {
  await seeds.marketplace.solutions(db)
  await seeds.marketplace.psychologyConcepts(db)
  await seeds.marketplace.xSolutionPsychologyConcepts(db)
}

(async () => {
  switch (process.argv[2]) {
    case 'oneStopSales':
      await seedOneStopSalesDb()
      break
    case 'identity':
      await seedIdentityDb()
      break
    case 'platform':
      await seedPlatformDb()
      break
    case 'marketplace':
      await seedMarketplaceDb()
      break
    default:
      throw new Error('Invalid schema')
  }
})()
