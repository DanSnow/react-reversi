import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import Sonda from 'sonda/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import TsConfigPath from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    Sonda(),
    Inspect({ open: true }),
    TsConfigPath(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
    tanstackStart({
      target: 'github-pages',
      react: {
        babel: {
          plugins: [
            'jotai/babel/plugin-react-refresh',
            'jotai/babel/plugin-debug-label',
            'babel-plugin-react-compiler',
          ],
        },
      },
    }),
  ],
})
