import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import Sonda from 'sonda/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import TsConfigPath from 'vite-tsconfig-paths'
import pkg from './package.json'

export default defineConfig({
  define: {
    VERSION: JSON.stringify(`${pkg.version}`),
  },
  plugins: [
    paraglideVitePlugin({
      project: './project.inlang',
      strategy: ['localStorage', 'preferredLanguage', 'baseLocale'],
      outdir: './src/paraglide',
    }),
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
  test: {
    environment: 'happy-dom',
  },
})
