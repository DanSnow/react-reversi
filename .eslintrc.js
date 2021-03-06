module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'standard', 'standard-react', 'prettier', 'prettier/prettier'],
  plugins: ['@typescript-eslint', 'react-hooks', 'simple-import-sort', 'unused-imports'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
  },
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    __DEV__: false,
    VERSION: false,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
