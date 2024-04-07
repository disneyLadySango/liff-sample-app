/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  plugins: ["unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              ["parent", "sibling"],
              "object",
              "type",
              "index",
            ],
            pathGroups: [
              {
                pattern: "react",
                group: "external",
                position: "before",
              },
              {
                pattern: "next/**",
                group: "external",
                position: "before",
              },
              {
                pattern: "@/components/design-system",
                group: "parent",
                position: "before",
              },
              {
                pattern: "@/components/**",
                group: "parent",
                position: "before",
              },
              {
                pattern: "**\\.css",
                group: "index",
                position: "after",
              },
            ],
            pathGroupsExcludedImportTypes: ["react", "next/**"],
            "newlines-between": "always",
            alphabetize: { order: "asc", caseInsensitive: false },
          },
        ],
        "import/first": "error",
        "import/newline-after-import": "error",
      },
    },
  ],
};
