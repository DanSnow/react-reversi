import path from 'node:path'
import react from '@vitejs/plugin-react'
import { SondaRollupPlugin } from 'sonda'
import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
  base: './',
  define: {
    VERSION: JSON.stringify(`${pkg.version}`),
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    react({
      babel: {
        presets: ['jotai/babel/preset'],
      },
    }),
    SondaRollupPlugin(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
