import type { RoofType } from "@olis/core/types";
import type { variablesData } from "@olis/db/seeds/remodel-x/data/variables";
import type { PricingVariablesOfTrade, ScopeAccessorOfTrade, TradeAccessor } from "@olis/db/types";

type TradeVariables = typeof variablesData;

export interface ProjectVars {
  numStories: number;
  roofType: RoofType;
}

export type PricingVars = {
  [U in TradeAccessor]: PricingVariablesOfTrade<U>;
}

interface TypeMap {
  number: number;
  select: string | number; // refine later if you want
  boolean: boolean;
}

type ExtractFormulaVariables<U extends keyof TradeVariables> = {
  [VarKey in TradeVariables[U][number]["key"]]: Extract<TradeVariables[U][number], { key: VarKey }>["dataType"] extends "select"
    ? Extract<TradeVariables[U][number], { key: VarKey }> extends { options: readonly (infer O)[] }
      ? O
      : string
    : TypeMap[Extract<TradeVariables[U][number], { key: VarKey }>["dataType"]]
};

export function defineCostFormulas<U extends keyof TradeVariables>(
  _trade: U,
) {
  // Inner defineFormula bound to this trade
  function defineFormula<K extends keyof ExtractFormulaVariables<U>>(
    fn: (vars: Pick<ExtractFormulaVariables<U>, K>) => number,
  ): (vars: Pick<ExtractFormulaVariables<U>, K>) => number {
    return fn;
  }

  // Builder to collect formulas
  function build<T extends Record<ScopeAccessorOfTrade<U>, ReturnType<typeof defineFormula>>>(
    formulas: T,
  ) {
    return formulas;
  }

  return { defineFormula, build };
}
