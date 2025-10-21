import type { Solution } from "@/shared/schema";

interface Props {
  solution: Solution;
}

export function SolutionOverview({ solution }: Props) {
  return (
    <div>
      <p>{solution.description}</p>
    </div>
  );
}
