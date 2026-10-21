import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          // The shadcn/ui primitives co-locate their `cva` variant helpers, hooks
          // and prop types with the component itself. Allow those known
          // non-component exports so the rule stays active everywhere else.
          allowExportNames: [
            "TextareaProps",
            "badgeVariants",
            "buttonVariants",
            "navigationMenuTriggerStyle",
            "toast",
            "toggleVariants",
            "useFormField",
            "useSidebar",
          ],
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
