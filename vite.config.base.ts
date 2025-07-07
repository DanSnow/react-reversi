import process from 'node:process'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import Sonda from 'sonda/vite'
import Icons from 'unplugin-icons/vite'
import Macros from 'unplugin-macros/vite'
import { defineConfig } from 'vite'
import TsConfigPath from 'vite-tsconfig-paths'
import { env } from './src/env'

const baseUrl = env.DEPLOY ? '/react-reversi/' : '/'

process.env.VITE_BASE_URL = baseUrl

export default defineConfig({
  build: {
    sourcemap: env.ANALYZE,
  },
  base: baseUrl,
  plugins: [
    Macros(),
    paraglideVitePlugin({
      project: './project.inlang',
      strategy: ['localStorage', 'preferredLanguage', 'baseLocale'],
      outdir: './src/paraglide',
    }),
    env.ANALYZE && Sonda(),
    TsConfigPath(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
  ],
  ssr: {
    noExternal: ['react-use'],
  },
  optimizeDeps: {
    include: ['react-use'],
  },
})
