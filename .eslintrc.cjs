const basePlugins = ["security", "import", "@babel"];

const baseExtends = [
  "eslint:recommended",
  "plugin:promise/recommended",
  "plugin:security/recommended",
];

const baseRules = {
  "security/detect-object-injection": "off",
  "security/detect-non-literal-fs-filename": "off",
  "security/detect-non-literal-require": "off",
  "no-prototype-builtins": "off",
  "curly": ["error", "all"],
  "no-console": "off",
  "no-dupe-else-if": "error",
  "no-import-assign": "error",
  "no-setter-return": "error",
  "array-callback-return": "error",
  "default-case": "error",
  "default-param-last": "error",
  "no-shadow": "error",
  "prefer-object-spread": "error",
  "grouped-accessor-pairs": "error",
  "no-constructor-return": "error",
  "no-floating-decimal": "error",
  "no-loop-func": "error",
  "no-useless-concat": "error",
  "radix": "error",
  "require-await": "error",
  "no-label-var": "error",
  "no-buffer-constructor": "error",
  "no-mixed-requires": "error",
  "func-name-matching": "error",
  "new-parens": "error",
  "no-bitwise": "error",
  "no-lonely-if": "error",
  "no-nested-ternary": "error",
  "no-var": "error",
  "prefer-const": "error",
  "object-shorthand": "error",
  "prefer-arrow-callback": "error",
  "prefer-rest-params": "error",
  "prefer-spread": "error",
  "prefer-template": "error",
  "import/named": "error",
  "import/no-unresolved": "error",
  "import/no-extraneous-dependencies": "error",
  "padding-line-between-statements": [
    "error",
    {
      blankLine: "always",
      prev: "import",
      next: "*",
    },
    {
      blankLine: "always",
      prev: "*",
      next: "import",
    },
    {
      blankLine: "any",
      prev: "import",
      next: "import",
    },
    {
      blankLine: "always",
      prev: "export",
      next: "*",
    },
    {
      blankLine: "always",
      prev: "*",
      next: "export",
    },
    {
      blankLine: "any",
      prev: "export",
      next: "export",
    },
  ],
};

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  globals: {
    Promise: "readonly",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".d.ts", ".js"],
      },
    },
  },
  overrides: [
    {
      files: ["**/*.js"],
      parser: "@babel/eslint-parser",
      plugins: basePlugins,
      extends: [...baseExtends, "prettier"],
      rules: baseRules,
    },
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: [...basePlugins, "@typescript-eslint"],
      extends: [
        ...baseExtends,
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      rules: {
        ...baseRules,
        "@typescript-eslint/no-explicit-any": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "require-await": "off",
        "@typescript-eslint/require-await": "error",
      },
    },
    {
      files: [
        "**/__tests__/**/*.js",
        "**/__mocks__/**/*.js",
        "**/test-utils/**/*.js",
      ],
      env: {
        jest: true,
        jasmine: true,
      },
      plugins: basePlugins,
      extends: [...baseExtends, "prettier"],
      rules: {
        ...baseRules,
        "import/no-named-default": "off",
      },
    },
  ],
};
