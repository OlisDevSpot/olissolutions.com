import type { JSX } from "react";

import type { TradeAccessor } from "@olis/db/types";

import { AtticBasementFields } from "./trade-fields/attic-basement-fields";
import { HvacFields } from "./trade-fields/hvac-fields";
import { RoofFields } from "./trade-fields/roof-fields";
import { SolarFields } from "./trade-fields/solar-fields";
import { WindowsFields } from "./trade-fields/windows-fields";

interface TradeFieldsForm {
  accessor: TradeAccessor;
  form: () => JSX.Element;
}

export const tradeFieldsForms: TradeFieldsForm[] = [
  {
    accessor: "solar",
    form: SolarFields,
  },
  {
    accessor: "roof",
    form: RoofFields,
  },
  {
    accessor: "windows",
    form: WindowsFields,
  },
  {
    accessor: "atticBasement",
    form: AtticBasementFields,
  },
  {
    accessor: "hvac",
    form: HvacFields,
  },
];
