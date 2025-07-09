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
        { allowConstantExport: true },
      ],
      // Prevenir imports não utilizados
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // Garantir consistência com ponto-e-vírgula
      semi: ["error", "always"],
      // Forçar uso de aspas simples
      quotes: ["error", "single", { allowTemplateLiterals: true }],
      // Evitar código não alcançável
      "no-unreachable": "error",
      // Evitar duplicação de propriedades em objetos
      "no-dupe-keys": "error",
      // Forçar espaçamento consistente
      "object-curly-spacing": ["error", "always"],
      // Garantir que arquivos terminem com uma nova linha
      "eol-last": ["error", "always"],
      // Prevenir números mágicos
      "no-magic-numbers": [
        "warn",
        {
          ignore: [-1, 0, 1, 2],
          ignoreArrayIndexes: true,
          enforceConst: true,
        },
      ],
    },
  },
);
