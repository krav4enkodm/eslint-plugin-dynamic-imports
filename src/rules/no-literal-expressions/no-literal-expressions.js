"use strict";

/** @type {import('eslint').Rule.RuleModule}*/
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow literal expressions for dynamic imports",
      recommended: true,
      url: "./no-literal-expressions.md",
    },
    fixable: "code",
    schema: {
      message: {
        type: "string",
      },
    },
  },
  create: (context) => {
    const [message = "Template expression is disallowed for dynamic import"] =
      context.options;

    return {
      ImportExpression(node) {
        const { type } = node.source;

        const isBinaryExpression = type === "BinaryExpression";
        const isTemplateLiteralWithExpressions =
          type === "TemplateLiteral" && Boolean(node.source.expressions.length);

        if (isBinaryExpression || isTemplateLiteralWithExpressions) {
          context.report({ node, message });
        }
      },
    };
  },
};
