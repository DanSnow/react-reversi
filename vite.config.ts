import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import React from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import Sonda from 'sonda/vite'
import { defineConfig, mergeConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { coverageConfigDefaults } from 'vitest/config'
import { env } from './src/env'
import baseConfig from './vite.config.base'

const baseUrl = env.DEPLOY ? '/react-reversi/' : '/'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

process.env.VITE_BASE_URL = baseUrl

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return mergeConfig(baseConfig, {
    plugins: [
      env.ANALYZE && Sonda(),
      devtools(),
      Inspect(),
      tanstackStart({
        spa: {
          enabled: true,
          maskPath: baseUrl,
          prerender: {
            enabled: true,
            outputPath: 'index.html',
          },
        },
        sitemap: {
          host: 'https://dansnow.github.io/react-reversi/',
        },
      }),
      React({
        babel: {
          plugins: [
            !isBuild && 'jotai/babel/plugin-react-refresh',
            !isBuild && 'jotai/babel/plugin-debug-label',
            'babel-plugin-react-compiler',
          ].filter((plugin): plugin is string => typeof plugin === 'string'),
        },
      }),
    ],
    ssr: {
      noExternal: ['react-use'],
    },
    optimizeDeps: {
      include: ['react-use'],
    },
    test: {
      environment: 'happy-dom',
      coverage: {
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: [
          ...coverageConfigDefaults.exclude,
          'src/routeTree.gen.ts',
          'src/paraglide/**/*.js',
          'src/components/ui/**/*.tsx',
        ],
      },
      projects: [
        {
          extends: true,
          test: {
            name: 'unit-test',
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              // The location of your Storybook config, main.js|ts
              configDir: path.join(dirname, '.storybook'),
              // This should match your package.json script to run Storybook
              // The --ci flag will skip prompts and not open a browser
              storybookScript: 'pnpm run storybook --ci',
            }),
          ],
          test: {
            name: 'storybook',
            // Enable browser mode
            browser: {
              enabled: true,
              // Make sure to install Playwright
              provider: playwright({
                launchOptions: {
                  headless: true,
                },
              }),
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: ['./.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  })
})
