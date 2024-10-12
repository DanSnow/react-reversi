import antfu from '@antfu/eslint-config'
import prettier from 'eslint-plugin-prettier'

const ignores = ['dist/', '**/dist/**/', '**/.yarn/**', 'node_modules/**', '*.md']

export default antfu({
  ignores,
  stylistic: false,
  plugins: {
    prettier,
  },
  rules: {
    'prettier/prettier': 'error',
  },
})
