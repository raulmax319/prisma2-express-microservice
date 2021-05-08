module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 0,
    'class-methods-use-this': 'off',
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-console': 'error',
  },
};
