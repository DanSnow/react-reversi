import { defineConfig } from '@tanstack/start/config'
import Icons from 'unplugin-icons/vite'
import TsConfigPath from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    preset: 'github-pages',
  },
  react: {
    babel: {
      plugins: ['jotai/babel/plugin-react-refresh', 'jotai/babel/plugin-debug-label'],
    },
  },
  vite: {
    plugins: () => [
      TsConfigPath(),
      Icons({
        compiler: 'jsx',
        jsx: 'react',
      }),
    ],
  },
})
