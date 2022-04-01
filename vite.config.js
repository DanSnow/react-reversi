import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json')

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
