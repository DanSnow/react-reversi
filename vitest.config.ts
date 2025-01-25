import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
  define: {
    VERSION: JSON.stringify(`${pkg.version}`),
  },
  plugins: [
    react({
      babel: {
        presets: ['jotai/babel/preset'],
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
