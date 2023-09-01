const noLiteralExpressions = require("./rules/no-literal-expressions/no-literal-expressions");
const noRestrictedPaths = require("./rules/no-restricted-paths/no-restricted-paths");

module.exports = {
  rules: {
    "no-literal-expressions": noLiteralExpressions,
    "no-restricted-paths": noRestrictedPaths,
  },
};
