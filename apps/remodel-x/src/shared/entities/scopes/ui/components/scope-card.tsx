import type { Scope } from "@olis/db/schema/platform";
import type { Card } from "@olis/ui/components/card";

import { ItemCard } from "@/shared/components/cards/item-summary-card";

// Scope Card Component
interface ScopeCardProps extends React.ComponentProps<typeof Card> {
  scope: Scope;
  onClick: () => void;
  showStars?: boolean;
  showHeader?: boolean;
  compareGoogle?: boolean;
}

export function ScopeCard({ scope, showStars, showHeader, compareGoogle, ...props }: ScopeCardProps) {
  return (
    <ItemCard item={scope} {...props}>
      <ItemCard.Image showStars={showStars} compareGoogle={compareGoogle} />
      {showHeader && <ItemCard.Header />}
    </ItemCard>
  );
}
