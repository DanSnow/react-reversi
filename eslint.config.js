import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

const ignores = ['dist/', '**/dist/**/', '**/.yarn/**', 'node_modules/**', '*.md']
export default antfu(
  {
    ignores,
    stylistic: false,
  },
  ...compat.config({
    ignorePatterns: ignores,
    extends: ['prettier', 'prettier/prettier'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  }),
)
