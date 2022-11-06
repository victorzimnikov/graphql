module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    browser: true
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended"],
  ignorePatterns: ["src\/gql\/**\/*"],
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    // Typescript
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",

    // ESLint
    quotes: "off",
    "no-console": "error",
    "no-use-before-define": "off",
    "no-case-declarations": "warn",
    "no-inner-declarations": "warn",
    "no-restricted-imports": ["error", { patterns: ["@mui/*/*/*", "!@mui/material/test-utils/*"] }],

    // React
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",

    // Promise
    "promise/always-return": "off",
  },
};
