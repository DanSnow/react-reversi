import path from 'node:path'
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import TsConfigPath from 'vite-tsconfig-paths'
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
    TsConfigPath(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
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
