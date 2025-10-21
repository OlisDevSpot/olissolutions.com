import { useGetUpgrades } from "@/shared/entities/upgrades/data/queries/get-upgrades";

export function useGetUpgradeById(id: number) {
  const upgrades = useGetUpgrades();

  if (!upgrades.data) {
    return null;
  }

  return upgrades.data.find(upgrade => upgrade.id === id);
}
