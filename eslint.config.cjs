const globals = require('globals');

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.es2020,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      node: require('eslint-plugin-node'),
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'no-console': ['error'],
      'no-process-exit': 'off',
      'complexity': ['error', 6],
      'no-trailing-spaces': ['error'],
      'semi': ['error', 'always'],
      'no-shadow': 'error',
    },
  },
];