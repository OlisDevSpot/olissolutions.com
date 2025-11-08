import type { LucideIcon } from "lucide-react";
import type { JSX } from "react";

import type { ElectricProvider } from "@olis/core/types";

import type { ENERGY_EFFICIENCY_MENU_ITEMS } from "./lib/constants";

export interface NavItem { 
  label: string; 
  accessor: string;
  href: string;
  Icon: LucideIcon;
}

export type StripSlash<T extends string> = T extends `${string}` ? never : T extends `/${infer R}` ? R : T;

export type EnergyEfficiencyStepsKey = typeof ENERGY_EFFICIENCY_MENU_ITEMS[number]["accessor"];

export interface EnergyEfficiencyProgramsGroup { 
  groupTitle: string;
  utility: ElectricProvider[];
  programs: Omit<NavItem, "Icon" | "accessor">[];
}

export interface FaqItem {
  question: string;
  answer: string | (() => JSX.Element);
  media?: {
    image: string;
    link: string;
  }[];
}

export interface EnergyEfficiencyEducationStep {
  accessor: EnergyEfficiencyStepsKey;
  title: string;
  questions: FaqItem[];
}
