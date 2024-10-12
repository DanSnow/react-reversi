import { defineConfig } from '@tanstack/start/config'
import { SondaRollupPlugin } from 'sonda'
import TsConfigPath from 'vite-tsconfig-paths'
import pkg from './package.json'

export default defineConfig({
  server: {
    appConfig: {
      version: pkg.version,
    },
  },
  react: {
    babel: {
      plugins: ['jotai/babel/plugin-react-refresh', 'jotai/babel/plugin-debug-label'],
    },
  },
  vite: {
    plugins: () => [TsConfigPath(), SondaRollupPlugin()],
  },
})
