import type { Column, SQL } from "drizzle-orm";

import { and, asc, eq } from "drizzle-orm";

import type { TableFilters } from "@/server/types";
import type { InsertUpgrade } from "@/shared/schema";

import db from "@/server/drizzle";
import { addons, solutions, upgrades } from "@/shared/schema";

export async function findAll() {
  return await db
    .select()
    .from(upgrades)
    .orderBy(asc(upgrades.label));
}

export async function findOne(id: number) {
  const [upgrade] = await db.select().from(upgrades).where(eq(upgrades.id, id));

  if (!upgrade) {
    return null;
  }

  return upgrade;
}

export async function createOne(data: InsertUpgrade) {
  const [newUpgrade] = await db.insert(upgrades).values(data).returning();

  if (!newUpgrade) {
    return null;
  }

  return newUpgrade;
}

export async function findOneAndUpdate(id: number, data: Partial<InsertUpgrade>) {
  const [updatedUpgrade] = await db.update(upgrades).set(data).where(eq(upgrades.id, id)).returning();
  return updatedUpgrade;
}

export async function find({ filters }: TableFilters<typeof upgrades>) {
  const conditions: SQL[] = [];

  for (const [key, value] of Object.entries(filters)) {
    const column = upgrades[key as keyof typeof upgrades] as Column;
    conditions.push(eq(column, value));
  }
  
  return await db.select().from(upgrades).where(and(...conditions));
}

export async function deleteOne(id: number) {
  return await db.delete(upgrades).where(eq(upgrades.id, id));
}

export async function findAllUpgradeAddons(upgradeId: number) {
  const foundAddonsOfUpgrade = await db
    .select({ upgrade: upgrades, addon: addons })
    .from(upgrades)
    .leftJoin(addons, eq(addons.upgradeId, upgrades.id))
    .where(eq(upgrades.id, upgradeId));

  const upgrade = foundAddonsOfUpgrade[0]?.upgrade;

  // if no upgrade found, return null (returned from Hono handler as 404)
  if (!upgrade) {
    return null;
  }

  const foundAddons = foundAddonsOfUpgrade.map(foundAddon => foundAddon.addon).filter(Boolean);

  // if no addons found, return upgrade with empty addons array -> handle in consumer (not 404)
  if (foundAddons.length === 0) {
    return {
      upgrade: {
        ...upgrade,
      },
      addons: [],
    };
  }

  return {
    upgrade: {
      ...upgrade,
    },
    addons: foundAddons.map((foundAddon) => {
      return {
        ...foundAddon,
      };
    }),
  };
}

export async function findAllSolutionsByUpgradeAccessor(accessor: string) {
  const rows = await db
    .select({
      upgrade: upgrades,
      solution: solutions,
    })
    .from(upgrades)
    .where(eq(upgrades.accessor, accessor))
    .leftJoin(solutions, eq(solutions.upgradeId, upgrades.id));

  const firstRow = rows[0];
  if (!firstRow) {
    return null;
  }

  const upgradeSolutions = {
    upgrade: {
      ...firstRow.upgrade,
    },
    solutions: rows.map((row) => {
      return {
        ...row.solution,
      };
    }),
  };

  return upgradeSolutions;
}
