import antfu from '@antfu/eslint-config'

import prettier from 'eslint-plugin-prettier'
import reactCompiler from 'eslint-plugin-react-compiler'
import storybook from 'eslint-plugin-storybook'

const ignores = [
  'dist/',
  '**/dist/**/',
  '**/.yarn/**',
  'node_modules/**',
  '*.md',
  'src/paraglide/**/*',
  'src/routeTree.gen.ts',
]

export default antfu({
  ignores,
  stylistic: false,
  react: true,
  plugins: {
    prettier,
  },
  rules: {
    'prettier/prettier': 'error',
  },
}).append(reactCompiler.configs.recommended, storybook.configs['flat/recommended'])
