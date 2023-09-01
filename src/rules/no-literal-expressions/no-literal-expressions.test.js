"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("./no-literal-expressions");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
});

ruleTester.run("no-literal-expressions", rule, {
  valid: [
    {
      name: "it works with path in single quotes",
      code: "import('path/to/module')",
    },
    {
      name: "it works with path in double quotes",
      code: 'import("path/to/module")',
    },
    {
      name: "it works with path in backticks",
      code: "import(`path/to/module`)",
    },
  ],
  invalid: [
    {
      name: "it reports custom error message",
      code: "import(`path${to}module`)",
      options: ["The custom message"],
      errors: [{ message: "The custom message" }],
    },
    {
      name: "it reports a default error message if backticks contains expression",
      code: "import(`path${to}module`)",
      errors: [
        { message: "Template expression is disallowed for dynamic import" },
      ],
    },
    {
      name: "it reports a default error message if the expression passed in single quotes",
      code: "import('path/' + 'to' + '/module')",
      errors: [
        { message: "Template expression is disallowed for dynamic import" },
      ],
    },
    {
      name: "it reports a default error message if the expression passed in double quotes",
      code: 'import("path/" + "to" + "/module")',
      errors: [
        { message: "Template expression is disallowed for dynamic import" },
      ],
    },
  ],
});
