# eslint-plugin-dynamic-imports

Rules for dynamic imports validation

## Installation

```sh
npm install --save-dev eslint-plugin-dynamic-imports
```

All rules are off by default, and you are able to configure them in your `.eslintrc`

```json
{
  "plugins": ["dynamic-imports"],
  "rules": {
    "dynamic-imports/no-literal-expressions": 2,
    "dynamic-imports/no-restricted-paths": [2, "path/to/module", "**/foo/**"]
  }
}
```

## Rules

Take a look at the rules documentation to adjust them more precisely for your needs:

- [no-restricted-paths](./src/rules/no-restricted-paths/no-restricted-paths.md)
- [no-literal-expressions](./src/rules/no-literal-expressions/no-literal-expressions.md)
