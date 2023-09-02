'use strict';

const micromatch = require('micromatch');
const path = require('path');

/** @type {import('eslint').Rule.RuleModule}*/
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallows specified paths for dynamic imports',
      recommended: true,
      url: './no-restricted-paths.md',
    },
    fixable: 'code',
    messages: {
      mismatch: "'{{ value }}' matches disallowed pattern '{{ path }}'",
    },
    schema: {
      anyOf: [
        {
          type: 'array',
          items: {
            type: 'string',
          },
          uniqueItems: true,
        },
        {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
              },
              message: {
                type: 'string',
              },
            },
            required: ['path'],
          },
        },
      ],
    },
  },
  create: (context) => {
    const { options } = context;
    return {
      ImportExpression(node) {
        if (typeof node.source.value !== 'string') {
          return;
        }

        const { value } = node.source;

        for (const option of options) {
          const isStringOption = typeof option === 'string';
          const pathToCheck = isStringOption ? option : option.path;

          const normalizedValued = value.startsWith('..')
            ? path.join('/', value)
            : path.normalize(value);

          if (!micromatch.isMatch(normalizedValued, pathToCheck)) {
            continue;
          }

          context.report({
            node,
            ...(!isStringOption && option.message
              ? { message: option.message }
              : { messageId: 'mismatch' }),
            data: {
              value,
              path: pathToCheck,
            },
          });
        }
      },
    };
  },
};
