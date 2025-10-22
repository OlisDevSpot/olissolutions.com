import { defineConfig } from "eslint/config";
import { config as baseConfig } from "@olis/eslint-config/base";

export default defineConfig([
  ...baseConfig,
  {
    rules: {
      "no-console": "error",
    },
  },
]);
