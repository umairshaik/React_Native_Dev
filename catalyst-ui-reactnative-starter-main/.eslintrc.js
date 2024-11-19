module.exports = {
  root: true,
  ignorePatterns: ['**/*.d.ts', 'e2e'],
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react-native'],
      extends: [
        'plugin:react/recommended',
        'prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    },
    {
      files: '**/*.+(js|jsx)',
      env: {
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 12,
      },
      extends: ['eslint:recommended', 'prettier'],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
