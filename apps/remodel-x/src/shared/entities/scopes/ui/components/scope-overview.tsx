import type { Scope } from "@olis/db/schema/platform";

interface Props {
  scope: Scope;
}

export function ScopeOverview({ scope }: Props) {
  return (
    <div>
      <p>{scope.description}</p>
    </div>
  );
}
