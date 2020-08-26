module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'standard', 'standard-react', 'prettier'],
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'simple-import-sort/sort': 'error',
  },
  env: {
    browser: true,
  },
  globals: {
    __DEV__: false,
    VERSION: false,
  },
  settings: {
    react: {
      version: '16.8',
    },
  },
}
