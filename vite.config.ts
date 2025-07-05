import process from 'node:process'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import Sonda from 'sonda/vite'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import TsConfigPath from 'vite-tsconfig-paths'
import pkg from './package.json'
import { env } from './src/env'

const baseUrl = env.DEPLOY ? '/react-reversi/' : '/'

process.env.VITE_BASE_URL = baseUrl

export default defineConfig({
  define: {
    VERSION: JSON.stringify(`${pkg.version}`),
  },
  build: {
    sourcemap: env.ANALYZE,
  },
  base: baseUrl,
  plugins: [
    paraglideVitePlugin({
      project: './project.inlang',
      strategy: ['localStorage', 'preferredLanguage', 'baseLocale'],
      outdir: './src/paraglide',
    }),
    env.ANALYZE && Sonda(),
    Inspect({ open: true }),
    TsConfigPath(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
    tanstackStart({
      target: 'github-pages',
      pages: [
        {
          path: baseUrl,
          prerender: {
            enabled: true,
          },
        },
      ],
      sitemap: {
        host: 'https://dansnow.github.io/react-reversi/',
      },
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
