import type { Upgrade } from "@/shared/schema";

import { ItemCard } from "@/shared/components/cards/item-summary-card";

// Upgrade Card Component
interface UpgradeCardProps {
  upgrade: Upgrade;
  onClick: () => void;
}

export function UpgradeCard({ upgrade, onClick }: UpgradeCardProps) {
  return (
    <ItemCard item={upgrade} onClick={onClick}>
      <ItemCard.Image badges={[upgrade.location]} />
      <ItemCard.Header />
    </ItemCard>
  );
}
