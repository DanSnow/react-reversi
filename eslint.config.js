import antfu from '@antfu/eslint-config'
import prettier from 'eslint-plugin-prettier'
import reactCompiler from 'eslint-plugin-react-compiler'

const ignores = ['dist/', '**/dist/**/', '**/.yarn/**', 'node_modules/**', '*.md', 'src/paraglide/**/*']

export default antfu({
  ignores,
  stylistic: false,
  plugins: {
    prettier,
  },
  rules: {
    'prettier/prettier': 'error',
  },
}).append(reactCompiler.configs.recommended)
