import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    ignores: ['dist/', '**/dist/**/'],
    stylistic: false,
  },
  ...compat.config({
    extends: ['prettier', 'prettier/prettier'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  }),
)
