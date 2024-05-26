import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import pkg from './package.json'

export default defineConfig({
  base: './',
  define: {
    VERSION: JSON.stringify(`${pkg.version}`),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
