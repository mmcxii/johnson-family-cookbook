module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "airbnb-typescript/base",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    /**
     * Named (non-default) export is preferred because it gives TS more awareness of the project,
     * which allows for easier importing.
     */
    "import/prefer-default-export": 0,
    /**
     * Double Quotes are preferred to single quotes.
     * Double quotes are more obvious as to where strings begin and end
     */
    "@typescript-eslint/quotes": 0,
    /**
     * The plusplus operator is useful in for-loops and should be allowed there.
     */
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    /**
     * This rule breaks the single purpose classes used to interact with the Type-GraphQL API.
     */
    "class-methods-use-this": 0,
    /**
     * This rule causes conflict with prettier.
     */
    "object-curly-newline": 0,
    /**
     * This rule causes conflict with prettier.
     * It mandates that arguments that are separated onto multitple lines be further indented by 2 characters
     * for each additional line, which is not desired behavior.
     */
    "@typescript-eslint/indent": 0,
  },
};
