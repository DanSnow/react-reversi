import process from 'node:process'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import Sonda from 'sonda/vite'
import Icons from 'unplugin-icons/vite'
import Macros from 'unplugin-macros/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import TsConfigPath from 'vite-tsconfig-paths'
import { env } from './src/env'

const baseUrl = env.DEPLOY ? '/react-reversi/' : '/'

process.env.VITE_BASE_URL = baseUrl

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
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
              !isBuild && 'jotai/babel/plugin-react-refresh',
              !isBuild && 'jotai/babel/plugin-debug-label',
              'babel-plugin-react-compiler',
            ].filter((plugin): plugin is string => typeof plugin === 'string'),
          },
        },
      }),
    ],
    test: {
      environment: 'happy-dom',
    },
  }
})
