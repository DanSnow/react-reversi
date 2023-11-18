import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import pkg from './package.json'

// const pkg = require('./package.json')

export default defineConfig({
  base: './',
  define: {
    VERSION: JSON.stringify(`${pkg.version}`),
  },
  plugins: [react()],
  test: {
    environment: 'happy-dom',
  },
})
