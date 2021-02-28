module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsx-a11y', 'prettier', 'react-hooks'],
  extends: ['airbnb-typescript-prettier'],
  rules: {
    camelcase: 0,
    'no-param-reassign': 0,
    'spaced-comment': 0,
    'no-nested-ternary': 0,
    '@typescript-eslint/no-unused-vars': 0,
    // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
