import type { Card } from "@/shared/components/ui/card";
import type { Solution } from "@/shared/schema";

import { ItemCard } from "@/shared/components/cards/item-summary-card";

// Solution Card Component
interface SolutionCardProps extends React.ComponentProps<typeof Card> {
  solution: Solution;
  onClick: () => void;
  showStars?: boolean;
  showHeader?: boolean;
  compareGoogle?: boolean;
}

export function SolutionCard({ solution, showStars, showHeader, compareGoogle, ...props }: SolutionCardProps) {
  return (
    <ItemCard item={solution} {...props}>
      <ItemCard.Image showStars={showStars} compareGoogle={compareGoogle} />
      {showHeader && <ItemCard.Header />}
    </ItemCard>
  );
}
