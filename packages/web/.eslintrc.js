module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "airbnb-typescript",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    /**
     * Prop-Types are disabled because TypeScript is a more capable type-checking system.
     */
    "react/prop-types": 0,
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
     * Prop spreading is desired.
     */
    "react/jsx-props-no-spreading": 0,
    /**
     * Indentaion is handled by prettier.
     */
    "@typescript-eslint/indent": 0,
    /**
     * Parenthesis wrapping is determined by prettier.
     */
    "react/jsx-wrap-multilines": 0,
  },
};
