"use strict";

const RuleTester = require("eslint").RuleTester;
const rule = require("./no-restricted-paths");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
});

ruleTester.run("no-restricted-paths", rule, {
  valid: [
    {
      name: "it works with passing the object option",
      code: "import('path/to/folder')",
      options: [
        {
          path: "foo/bar",
        },
      ],
    },
    {
      name: "it works with passing the string option",
      code: "import('path/to/folder')",
      options: ["foo/bar"],
    },
  ],
  invalid: [
    {
      name: "it reports with the default error message when string options is passed",
      code: "import('path/to/folder')",
      options: ["path/to/folder"],
      errors: [
        {
          message:
            "'path/to/folder' matches disallowed pattern 'path/to/folder'",
        },
      ],
    },
    {
      name: "it reports with the default error message when object options is passed",
      code: "import('path/to/folder')",
      options: [
        {
          path: "path/to/folder",
        },
      ],
      errors: [
        {
          message:
            "'path/to/folder' matches disallowed pattern 'path/to/folder'",
        },
      ],
    },
    {
      name: "it reports with the custom error message",
      code: "import('path/to/folder')",
      options: [
        {
          path: "path/to/folder",
          message: "The custom message",
        },
      ],
      errors: [{ message: "The custom message" }],
    },
    {
      name: "it reports an error message for absolute paths",
      code: "import('/path/to/folder')",
      options: ["/path/**"],
      errors: [
        {
          message: "'/path/to/folder' matches disallowed pattern '/path/**'",
        },
      ],
    },
    {
      name: "it reports an error message for relative paths",
      code: "import('./path/to/folder')",
      options: ["path/**"],
      errors: [
        {
          message: "'./path/to/folder' matches disallowed pattern 'path/**'",
        },
      ],
    },
    {
      name: "it reports an error message for relative paths with the path to upper folders",
      code: "import('../path/to/folder')",
      options: ["**/path/**"],
      errors: [
        {
          message:
            "'../path/to/folder' matches disallowed pattern '**/path/**'",
        },
      ],
    },
  ],
});
